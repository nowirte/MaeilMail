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
    const letters = await this.Letters.findAll({ where: { [Op.or]: [{send_Id: userId}, {receive_Id: userId}]}, raw: true});
    return letters;
  }

  // 쪽지보냈던 사람들 조회
  async getContactUsers(myId) {
    const targetId = await this.Letter.findAll({
      where: { [Op.or]: [{ send_Id: myId }, { receive_Id: myId }] },
      raw: true,
    });
    
    const idArrayTemp = [];

    for (let i = 0; i < targetId.length; i += 1) {
      if (targetId[i].receive_Id === myId) {
        idArrayTemp.push(targetId[i].send_Id);
      } else {
        idArrayTemp.push(targetId[i].receive_Id);
      }
    }
    const idArray = [...new Set(idArrayTemp)];
    
    // 나한테 온 편지 찾기
    const myLetter = await this.Letter.findAll({
      where: { receive_Id: myId},
      is_read: 0,
      raw: true,
    });

    const myIdArrayTemp = [];
    for (let j=0; j<myLetter.length; j+=1) {
      myIdArrayTemp.push(myLetter[j].send_Id);
    }

    const myIdArray = [...new Set(myIdArrayTemp)];
    
    const myLetterUnread = await this.Letter.findAll({
      where: {send_Id: {[Op.in]: myIdArray}, receive_Id: myId, is_read: 0},
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
        if (peoples[m].user_Id === myLetterUnread[n].send_Id) {
          peoples[m].count += 1;
        }
      }
    }

    return peoples;
  }

  async updateIsArrivedBySchedule(letter_id, deliveryTime) {
    const elapsedDay = parseInt(Number(deliveryTime) / 1440, 10);
    const elapsedHours = parseInt(Number(deliveryTime) / 60, 10);
    const elpasedMinutes = Number(deliveryTime) % 60;

    const arriveDate = new Date();

    arriveDate.setDate(arriveDate.getDate() + elapsedDay);
    arriveDate.setHours(arriveDate.getHours() + elapsedHours);
    arriveDate.setMinutes(arriveDate.getMinutes() + elpasedMinutes);

    const job = await scheduleJob(arriveDate, async () => {
      await this.Letter.update({ is_arrived: true }, { where: { letter_id } });
    });
    return job;
  }

  // 편지쓰기
  async createLetterTo(yourId, targetId, content, sendDate, receiveDate, deliveryTime) {
    const sendLocation = await this.User.findAll({ where: { user_id: yourId }, attributes: ['location'], raw: true });
    const receiveLocation = await this.User.findAll({
      where: { user_id: targetId },
      attributes: ['location'],
      raw: true,
    });

    const mail = await this.Letter.create({
      send_Id: yourId,
      receive_Id: targetId,
      content,
      send_date: sendDate,
      receive_date: receiveDate,
      is_arrived: 0,
      is_read: 0,
      send_location: sendLocation[0]['location'],
      receive_location: receiveLocation[0]['location'],
    });

    const cronJob = await this.updateIsArrivedBySchedule(mail['letter_id'], deliveryTime);
    if (!cronJob) {
      throw new Error('도착시간 설정에 실패하였습니다. 입력 값을 확인해주세요.');
    }

    const reqMail = await this.Letter.findAll({
      where: { letter_id: mail['letter_id'] },
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    return reqMail;
  }

  // 상대방과 나눴던 쪽지 모두 가져오기
  async getLettersById(myId, oponentId) {
    const findedLetter = await this.Letter.findAll({
      where: {
        [Op.or]: [
          { send_Id: myId, receive_Id: oponentId },
          { send_Id: oponentId, receive_Id: myId },
        ],
      },
      order: [['receive_date', 'DESC']],
      raw: true,
    });

    const nickname = await this.User.findAll({
      where: { [Op.or]: [{ user_id: oponentId }, { user_id: myId }] },
      attributes: ['nickname', 'user_id'],
      raw: true,
    });

    for (let i = 0; i < findedLetter.length; i += 1) {
      findedLetter[i].nickname =
        Number(nickname[0].user_id) === Number(findedLetter[i].send_Id) ? nickname[0].nickname : nickname[1].nickname;
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
          { send_Id: myId, receive_Id: oponentId, letter_id: letterId },
          { send_Id: oponentId, receive_Id: myId, letter_id: letterId },
        ],
      },
      raw: true,
    });

    if (findedLetter.send_Id === myId) {
      const myNickname = await this.User.findAll({ where: { user_id: myId }, attributes: ['nickname'], raw: true });
      findedLetter.nickname = myNickname[0].nickname;
    } else {
      const opponentNickname = await this.User.findAll({
        where: { user_id: oponentId },
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
      { is_read: isRead },
      { where: { letter_id: letterId, receive_Id: myId } }
    );
    return updatedLetter;
  }

  // 상대방과 대화내역 삭제
  async deleteLetterById(myId, oponentId) {
    const deletedLetter = await this.Letter.destroy({
      where: {
        [Op.or]: [
          { send_Id: myId, receive_Id: oponentId },
          { send_Id: oponentId, receive_Id: myId },
        ],
      },
    });

    return deletedLetter;
  }

  // 오고 있는 편지
  async incomingLetters(myId) {
    const myLetter = await this.Letter.findAll({
      where: { receive_Id: myId, is_arrived: 0, is_read: 0 },
      raw: true,
      order: [['receive_date', 'DESC']],
    });

    const idArrayTemp = [];

    for (let i = 0; i < myLetter.length; i += 1) {
      idArrayTemp.push(myLetter[i].send_Id);
    }
    const idArray = [...new Set(idArrayTemp)];

    const userInfo = await this.User.findAll({
      where: { user_id: { [Op.in]: idArray } },
      raw: true,
      attributes: ['user_id', 'nickname', 'profile_Image'],
    });

    for (let i = 0; i < myLetter.length; i += 1) {
      for (let j = 0; j < userInfo.length; j += 1) {
        if (myLetter[i].send_Id === userInfo[j].user_id) {
          myLetter[i].user_id = userInfo[j].user_id;
          myLetter[i].nickname = userInfo[j].nickname;
          myLetter[i].profile_Image = userInfo[j].profile_Image;
        }
      }
    }

    return myLetter;
  }

  // 가장 최근에 온 편지
  async getRecentLetters(myId) {
    const myLetters = await this.Letter.findAll({ where: { receive_Id: myId, is_arrived: 1, is_read: 0 }, raw: true});
    
    const idArrayTemp = [];
    
    for (let i=0; i<myLetters.length; i+=1) {
      idArrayTemp.push(myLetters[i].send_Id);
    }
    const idArray = [...new Set(idArrayTemp)];
    
    const userNickname = await this.User.findAll({
      where: { user_id: { [Op.in]: idArray } },
      raw: true,
      attributes: ['nickname','user_id'],
    });

    for (let i = 0; i < myLetters.length; i += 1) {
      for (let j = 0; j < userNickname.length; j += 1) {
        if (myLetters[i].send_Id === userNickname[j].user_id) {
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

    const findedLetter = await this.Letter.findAll({
      where: {
        [Op.or]: [
          { send_Id: myId, receive_Id: oponentId },
          { send_Id: oponentId, receive_Id: myId },
        ],
      },
      order: [['receive_date', 'DESC']],
      raw: true,
      offset,
      limit: 10
    });
    
    const nickname = await this.User.findAll({
      where: { [Op.or]: [{ user_id: oponentId }, { user_id: myId }] },
      attributes: ['nickname', 'user_id'],
      raw: true,
    });

    for (let i = 0; i < findedLetter.length; i += 1) {
      findedLetter[i].nickname =
        Number(nickname[0].user_id) === Number(findedLetter[i].send_Id) ? nickname[0].nickname : nickname[1].nickname;
    }

    if (!findedLetter) {
      throw new Error('삭제되었거나 쪽지 내역이 존재하지 않습니다.');
    } else {
      return findedLetter;
    }
  }
};

const letterService = new LetterService(User, Letter);

export { letterService };
