/* eslint-disable dot-notation */
import { Op } from 'sequelize';
import { Letter, User } from '../db/models';

class LetterService {
  constructor(param1, param2) {
    this.User = param1;
    this.Letter = param2;
  }

  // 쪽지보냈던 사람들 조회
  async getContactUsers(myId) {
    const targetId = await this.Letter.findAll({[Op.or]: [{where: {sendId: myId}, attributes: ['receiveId']},
                                                            {where: {receiveId: myId}, attributes: ['sendId']}], raw: true});
    const idArray = [];
    
    for (let i=0; i<targetId.length; i+=1) {
      if (targetId[i].receiveId === myId) {
        idArray.push(targetId[i].sendId);
      } else {
        idArray.push(targetId[i].receiveId);
      }
    }
    
    const peoples = await this.User.findAll({ where: { user_id: {[Op.in]: idArray} }, attributes: ['user_id', 'nickname', 'profileImage']});
    
    return peoples;
  }

  // 편지쓰기
  async createLetterTo(yourId, targetId, content) {
    const sendLocation = await this.User.findAll({ where : { user_id: yourId }, attributes: ['location'], raw: true });
    const receiveLocation = await this.User.findAll({ where : { user_id: targetId }, attributes: ['location'], raw: true}); 

    const mail = await this.Letter.create({
        sendId: yourId,
        receiveId: targetId,
        content,
        send_date: new Date(),
        receive_date: new Date(),
        is_arrived: false,
        is_read: false,
        send_location: sendLocation[0]['location'],
        receive_location: receiveLocation[0]['location']
      });

    return mail;
  }

  // 상대방과 나눴던 쪽지 모두 가져오기
  async getLettersById(myId, oponentId) {

    const findedLetter = await this.Letter.findAll({ where: {[Op.or]: 
      [{ sendId: myId, receiveId: oponentId }, {sendId: oponentId, receiveId: myId}]} });  
     
    if (!findedLetter) {
      throw new Error("삭제되었거나 쪽지 내역이 존재하지 않습니다.")
    } else {
      return findedLetter;
    }  
  };

  // 상대방과 나눴던 쪽지 상세 보기
  async getLetterById(myId, oponentId, letterId) {
    
    const findedLetter = await this.Letter.findOne({ where: { sendId: myId, receiveId: oponentId, letter_id: letterId } });  
    
    if (!findedLetter) {
      throw new Error("삭제되었거나 쪽지 내역이 존재하지 않습니다.")
    } else {
      return findedLetter;
    }
  };

  // 상대방과 대화내역 삭제
  async deleteLetterById(myId, oponentId) {
    
    const deletedLetter = await this.Letter.destroy({ where: {[Op.or]: 
      [{ sendId: myId, receiveId: oponentId }, {sendId: oponentId, receiveId: myId}]} });
     
    return deletedLetter;
  }

};

const letterService = new LetterService(User, Letter);

export { letterService };
