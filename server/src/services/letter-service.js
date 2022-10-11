/* eslint-disable camelcase */
/* eslint-disable dot-notation */
import { Op } from 'sequelize';
import { scheduleJob } from 'node-schedule';
import { Letter, User } from '../db/models';

class LetterService {
  constructor(param1, param2) {
    this.User = param1;
    this.Letter = param2;
  }

  // 특정 유저가 보내거나 받은 쪽지 다 가져오기
  async getUsersLetters(userId) {
    const letters = await this.Letters.findAll({ where: { [Op.or]: [{send_id: userId}, {receive_id: userId}]}, raw: true});
    return letters;
  }

  // 쪽지보냈던 사람들 조회
  async getContactUsers(myId) {
    const targetId = await this.Letter.findAll({
      where: { [Op.or]: [{ send_id: Number(myId) }, { receive_id: Number(myId) }] },
      raw: true,
    });
    
    const idArrayTemp = [];
    
    for (let i = 0; i < targetId.length; i += 1) {
      if (targetId[i].receive_id === myId) {
        idArrayTemp.push(targetId[i].send_id);
      } else {
        idArrayTemp.push(targetId[i].receive_id);
      }
    }
    const idArray = [...new Set(idArrayTemp)];

    // 나한테 온 편지 찾기
    const myLetter = await this.Letter.findAll({
      where: { receive_id: myId},
      is_read: 0,
      raw: true,
    });

    const myIdArrayTemp = [];
    for (let j=0; j<myLetter.length; j+=1) {
      myIdArrayTemp.push(myLetter[j].send_id);
    }

    const myIdArray = [...new Set(myIdArrayTemp)];
    
    const myLetterUnread = await this.Letter.findAll({
      where: {send_id: {[Op.in]: myIdArray}, receive_id: myId, isRead: 0},
      raw: true
    });

    const peoples = await this.User.findAll({
      where: { user_id: { [Op.in]: idArray } },
      attributes: ['user_id', 'nickname', 'profile_image'],
      raw: true,
    });

    for(let k=0; k<peoples.length; k+=1) {
      peoples[k].count = 0;
    }

    for (let m=0; m<peoples.length; m+=1){
      for (let n=0; n<myLetterUnread.length; n+=1) {
        if (peoples[m].user_id === myLetterUnread[n].send_id) {
          peoples[m].count += 1;
        }
      }
    }

    return peoples;
  }

  async updateIsArrivedBySchedule(letterId, deliveryTime) {
    const elapsedDay = parseInt(Number(deliveryTime) / 1440, 10);
    const elapsedHours = parseInt(Number(deliveryTime) / 60, 10);
    const elpasedMinutes = Number(deliveryTime) % 60;

    const arriveDate = new Date();

    arriveDate.setDate(arriveDate.getDate() + elapsedDay);
    arriveDate.setHours(arriveDate.getHours() + elapsedHours);
    arriveDate.setMinutes(arriveDate.getMinutes() + elpasedMinutes);

    const job = await scheduleJob(arriveDate, async () => {
      await this.Letter.update({ isArrived: true }, { where: { letterId } });
    });

    return job;
  }

  // 편지쓰기
  async createLetterTo(yourId, targetId, content, sendDate, receiveDate, deliveryTime) {
    const sendLocation = await this.User.findAll({ where: { userId: yourId }, attributes: ['location'], raw: true });
    const receiveLocation = await this.User.findAll({
      where: { userId: targetId },
      attributes: ['location'],
      raw: true,
    });

    const mail = await this.Letter.create({
      send_id: yourId,
      receive_id: targetId,
      content,
      sendDate,
      receiveDate,
      isArrived: 0,
      isRead: 0,
      sendLocation: sendLocation[0]['location'],
      receiveLocation: receiveLocation[0]['location'],
    });

    const cronJob = await this.updateIsArrivedBySchedule(mail['letterId'], deliveryTime);
    if (!cronJob) {
      throw new Error('도착시간 설정에 실패하였습니다. 입력 값을 확인해주세요.');
    }

    const reqMail = await this.Letter.findAll({
      where: { letterId: mail['letterId'] },
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    return reqMail;
  }

  // 상대방과 나눴던 쪽지 모두 가져오기
  async getLettersById(myId, oponentId) {
    const findedLetter = await this.Letter.findAll({
      where: {
        [Op.or]: [
          { send_id: myId, receive_id: oponentId },
          { send_id: oponentId, receive_id: myId },
        ],
      },
      order: [['receive_date', 'DESC']],
      raw: true,
    });

    const nickname = await this.User.findAll({
      where: { [Op.or]: [{ userId: oponentId }, { userId: myId }] },
      attributes: ['nickname', 'user_id'],
      raw: true,
    });

    for (let i = 0; i < findedLetter.length; i += 1) {
      findedLetter[i].nickname =
        Number(nickname[0].user_id) === Number(findedLetter[i].send_id) ? nickname[0].nickname : nickname[1].nickname;
    }

    if (!findedLetter) {
      throw new Error('삭제되었거나 쪽지 내역이 존재하지 않습니다.');
    } else {
      return findedLetter;
    }
  }

  // 상대방과 나눴던 쪽지 상세 보기
  async getLetterById(myId, oponentId, letterId) {
    const findedLetter = await this.Letter.findOne({
      where: {
        [Op.or]: [
          { send_id: myId, receive_id: oponentId, letterId },
          { send_id: oponentId, receive_id: myId, letterId },
        ],
      },
      raw: true,
    });
    
    if (findedLetter.send_id === myId) {
      const myNickname = await this.User.findAll({ where: { userId: myId }, attributes: ['nickname'], raw: true });
      findedLetter.nickname = myNickname[0].nickname;
    } else {
      const opponentNickname = await this.User.findAll({
        where: { userId: oponentId },
        attributes: ['nickname'],
        raw: true,
      });
      findedLetter.nickname = opponentNickname[0].nickname;
    }

    return findedLetter;
  }

  // isRead
  async updateLetterById(myId, letterId, isRead) {
    const updatedLetter = await this.Letter.update(
      { isRead },
      { where: { letterId, receive_id: myId } }
    );
    return updatedLetter;
  }

  // 상대방과 대화내역 삭제
  async deleteLetterById(myId, oponentId) {
    const deletedLetter = await this.Letter.destroy({
      where: {
        [Op.or]: [
          { send_id: myId, receive_id: oponentId },
          { send_id: oponentId, receive_id: myId },
        ],
      },
    });

    return deletedLetter;
  }

  // 오고 있는 편지
  async incomingLetters(myId) {
    const myLetter = await this.Letter.findAll({
      where: { receive_id: myId, isArrived: 0, isRead: 0 },
      raw: true,
      order: [['receive_date', 'DESC']],
    });

    const idArrayTemp = [];

    for (let i = 0; i < myLetter.length; i += 1) {
      idArrayTemp.push(myLetter[i].send_id);
    }
    const idArray = [...new Set(idArrayTemp)];

    const userInfo = await this.User.findAll({
      where: { userId: { [Op.in]: idArray } },
      raw: true,
      attributes: ['user_id', 'nickname', 'profile_image'],
    });

    for (let i = 0; i < myLetter.length; i += 1) {
      for (let j = 0; j < userInfo.length; j += 1) {
        if (myLetter[i].send_id === userInfo[j].user_id) {
          myLetter[i].user_id = userInfo[j].user_id;
          myLetter[i].nickname = userInfo[j].nickname;
          myLetter[i].profile_image = userInfo[j].profile_image;
        }
      }
    }

    return myLetter;
  }

  // 가장 최근에 온 편지
  async getRecentLetters(myId) {
    const myLetters = await this.Letter.findAll({ where: { receive_id: myId, isArrived: 1, isRead: 0 }, raw: true});
    
    const idArrayTemp = [];
    
    for (let i=0; i<myLetters.length; i+=1) {
      idArrayTemp.push(myLetters[i].send_id);
    }
    const idArray = [...new Set(idArrayTemp)];
    
    const userNickname = await this.User.findAll({
      where: { userId: { [Op.in]: idArray } },
      raw: true,
      attributes: ['nickname','user_id'],
    });

    for (let i = 0; i < myLetters.length; i += 1) {
      for (let j = 0; j < userNickname.length; j += 1) {
        if (myLetters[i].send_id === userNickname[j].user_id) {
          myLetters[i].nickname = userNickname[j].nickname;
        }
      }
    }

    return myLetters;
  }

  // letter-Pagination
  async getLettersByPage(myId, oponentId, pageNum){

    let offset = 0;
    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }
    const page = await this.Letter.findAll({
      where: {
        [Op.or]: [
          { send_id: myId, receive_id: oponentId },
          { send_id: oponentId, receive_id: myId },
        ],
      },
      order: [['receive_date', 'DESC']],
      raw: true,
    });

    const totalPage = page.length <= 10 ? 1 : parseInt(page.length / 10, 10) + 1;
    
    const findedLetter = await this.Letter.findAll({
      where: {
        [Op.or]: [
          { send_id: myId, receive_id: oponentId },
          { send_id: oponentId, receive_id: myId },
        ],
      },
      order: [['receive_date', 'DESC']],
      raw: true,
      offset,
      limit: 10
    });
    
    const nickname = await this.User.findAll({
      where: { [Op.or]: [{ userId: oponentId }, { userId: myId }] },
      attributes: ['nickname', 'user_id'],
      raw: true,
    });

    for (let i = 0; i < findedLetter.length; i += 1) {
      findedLetter[i].nickname =
        Number(nickname[0].user_id) === Number(findedLetter[i].send_id) ? nickname[0].nickname : nickname[1].nickname;
    }

    if (!findedLetter) {
      throw new Error('삭제되었거나 쪽지 내역이 존재하지 않습니다.');
    } else {
      return {findedLetter, totalPage};
    }
  }
};

const letterService = new LetterService(User, Letter);

export { letterService };
