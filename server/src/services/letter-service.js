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
    const letters = await this.Letters.findAll({ where: { [Op.or]: [{sendId: userId}, {receiveId: userId}]}, raw: true});
    return letters;
  }

  // 쪽지보냈던 사람들 조회
  async getContactUsers(myId) {
    const targetId = await this.Letter.findAll({
      where: { [Op.or]: [{ sendId: myId }, { receiveId: myId }] },
      raw: true,
    });
    const idArray = [];

    for (let i = 0; i < targetId.length; i += 1) {
      if (targetId[i].receiveId === myId) {
        idArray.push(targetId[i].sendId);
      } else {
        idArray.push(targetId[i].receiveId);
      }
    }

    const peoples = await this.User.findAll({
      where: { user_id: { [Op.in]: idArray } },
      attributes: ['user_id', 'nickname', 'profileImage'],
    });

    return peoples;
  }

  async cronUpdateLetter(letter_id, receive_date) {
    const job = await scheduleJob(receive_date, async () => {
      await this.Letter.update({ is_arrived: true }, { where: { letter_id } });
    });
    return job;
  }

  // 편지쓰기
  async createLetterTo(yourId, targetId, content, sendDate, receiveDate) {
    const sendLocation = await this.User.findAll({ where: { user_id: yourId }, attributes: ['location'], raw: true });
    const receiveLocation = await this.User.findAll({
      where: { user_id: targetId },
      attributes: ['location'],
      raw: true,
    });

    const mail = await this.Letter.create({
      sendId: yourId,
      receiveId: targetId,
      content,
      send_date: sendDate,
      receive_date: receiveDate,
      is_arrived: false,
      is_read: false,
      send_location: sendLocation[0]['location'],
      receive_location: receiveLocation[0]['location'],
    });

    const cronJob = await this.cronUpdateLetter(mail['letter_id'], receiveDate);
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
          { sendId: myId, receiveId: oponentId },
          { sendId: oponentId, receiveId: myId },
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
        Number(nickname[0].user_id) === Number(findedLetter[i].sendId) ? nickname[0].nickname : nickname[1].nickname;
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
          { sendId: myId, receiveId: oponentId, letter_id: letterId },
          { sendId: oponentId, receiveId: myId, letter_id: letterId },
        ],
      },
      raw: true,
    });

    if (findedLetter.sendId === myId) {
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
      { where: { letter_id: letterId, receiveId: myId } }
    );
    return updatedLetter;
  }

  // 상대방과 대화내역 삭제
  async deleteLetterById(myId, oponentId) {
    const deletedLetter = await this.Letter.destroy({
      where: {
        [Op.or]: [
          { sendId: myId, receiveId: oponentId },
          { sendId: oponentId, receiveId: myId },
        ],
      },
    });

    return deletedLetter;
  }

  // 오고 있는 편지
  async incomingLetters(myId) {
    const myLetter = await this.Letter.findAll({
      where: { receiveId: myId, is_arrived: 0, is_read: 0 },
      raw: true,
      order: [['receive_date', 'DESC']],
    });

    const idArrayTemp = [];

    for (let i = 0; i < myLetter.length; i += 1) {
      idArrayTemp.push(myLetter[i].sendId);
    }
    const idArray = [...new Set(idArrayTemp)];

    const userInfo = await this.User.findAll({
      where: { user_id: { [Op.in]: idArray } },
      raw: true,
      attributes: ['user_id', 'nickname', 'profileImage'],
    });

    for (let i = 0; i < myLetter.length; i += 1) {
      for (let j = 0; j < userInfo.length; j += 1) {
        if (myLetter[i].sendId === userInfo[j].user_id) {
          myLetter[i].user_id = userInfo[j].user_id;
          myLetter[i].nickname = userInfo[j].nickname;
          myLetter[i].profileImage = userInfo[j].profileImage;
        }
      }
    }

    return myLetter;
  }

  // 가장 최근에 온 편지
  async getRecentLetters(myId) {
    const myLetters = await this.Letter.findAll({ where: { receiveId: myId, is_arrived: 1 }, raw: true});
    
    const idArrayTemp = [];
    
    for (let i=0; i<myLetters.length; i+=1) {
      idArrayTemp.push(myLetters[i].sendId);
    }
    const idArray = [...new Set(idArrayTemp)];
    
    const userNickname = await this.User.findAll({
      where: { user_id: { [Op.in]: idArray } },
      raw: true,
      attributes: ['nickname','user_id'],
    });

    for (let i = 0; i < myLetters.length; i += 1) {
      for (let j = 0; j < userNickname.length; j += 1) {
        if (myLetters[i].sendId === userNickname[j].user_id) {
          myLetters[i].nickname = userNickname[j].nickname;
        }
      }
    }


    return myLetters;
  }
};

const letterService = new LetterService(User, Letter);

export { letterService };
