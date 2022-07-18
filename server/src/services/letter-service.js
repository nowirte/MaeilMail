import { Op } from 'sequelize';
import { Letter, User } from '../db/models';


//  const include = [{ model: Letter }];
class LetterService {
  constructor(param1, param2) {
    this.User = param1;
    this.Letter = param2;
  }

  // 쪽지보냈던 사람들 조회
  async getContactUsers(myId) {
    const targetId = await this.Letter.findAll({ where: { sendId: myId }, attributes: ['receiveId']});
    
    const idArray = [];
    for (let i=0; i<targetId.length; i+=1) {
      idArray.push(targetId[i].receiveId);
    }

    const peoples = await this.User.findAll({ where: { user_id: {[Op.in]: idArray} }});
    return peoples;
  }

  // 편지쓰기
  async createLetterTo(yourId, targetId, content) {
      
    const mail = await this.Letter.create({
        sendId: yourId,
        receiveId: targetId,
        content,
        send_date: new Date(),
        isArrived: false,
        isRead: false,
      });

    return mail;
  }

  // 상대방과 나눴던 쪽지 모두 가져오기
  async getLettersById(myId, oponentId) {
    const target = await this.Letter.findOne({ where: {sendId: oponentId, receiveId: myId} });
    const my = await this.Letter.findOne({ where: {sendId: myId, receiveId: oponentId} });
  
    if (!target || !my) {
      throw new Error("상대방과의 쪽지 내역이 존재하지 않습니다."); 
    };
    
    const findedLetter = await this.Letter.findAll({ where: {[Op.or]: 
      [{ sendId: myId, receiveId: oponentId }, {sendId: oponentId, receiveId: myId}]} });  
    
    return findedLetter;
  };

  // 상대방과 나눴던 쪽지 상세 보기
  async getLetterById(myId, oponentId, letterId) {
    const target = await this.Letter.findOne({ where: {receiveId: oponentId} });
    const my = await this.Letter.findOne({ where: {sendId: myId} });
    if (!target || !my) {
      throw new Error("상대방과의 쪽지 내역이 존재하지 않습니다."); 
    };
    
    const findedLetter = await this.Letter.findOne({ where: { sendId: myId, receiveId: oponentId, letter_id: letterId } });  
    
    return findedLetter;
  };

  // 상대방과 대화내역 삭제
  async deleteLetterById(myId, oponentId) {
    const target = await this.Letter.findOne({ where: {sendId: oponentId, receiveId: myId} });
    const my = await this.Letter.findOne({ where: {sendId: myId, receiveId: oponentId} });
    
    if (!target || !my) {
      throw new Error("상대방과의 쪽지 내역이 존재하지 않습니다."); 
    };

    const deletedLetter = await this.Letter.destroy({ where: {[Op.or]: 
      [{ sendId: myId, receiveId: oponentId }, {sendId: oponentId, receiveId: myId}]} });
     
    return deletedLetter;
  }

};

const letterService = new LetterService(User, Letter);

export { letterService };
