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
      console.log(`${letter_id}번 편지 도착`);
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
    console.log(cronJob);

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
      where: { sendId: myId, receiveId: oponentId, letter_id: letterId },
    });

    if (!findedLetter) {
      throw new Error('삭제되었거나 쪽지 내역이 존재하지 않습니다.');
    } else {
      return findedLetter;
    }
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

  async incomingLetters(myId, isArrived) {
    if (isArrived) {
      throw new Error('배송중인 쪽지가 존재하지 없습니다.');
    } else {
      const myLetter = await this.Letter.findAll({ where: { receiveId: myId, is_arrived: isArrived } });

      return myLetter;
    }
  }
}

const letterService = new LetterService(User, Letter);

export { letterService };
