/* eslint-disable import/named */
import { Router } from 'express';
import { letterService } from '../services';
import { loginRequired } from '../middleware';

const lettersRouter = Router();

// 편지 주고받는 사람들 목록(Query String 이용)
lettersRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    const myId = req.userId;
    const result = await letterService.getContactUsers(myId);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 오고 있는 편지
lettersRouter.get('/incoming', loginRequired, async (req, res, next) => {
  try{
    const myId = req.userId;
    const result = await letterService.incomingLetters(myId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 편지쓰기 (path parameter 사용)
lettersRouter.post('/:userId', loginRequired ,async (req, res, next) => {
  try {
    const myId = req.userId;
    const { userId } = req.params;
    const { content, sendDate, receiveDate } = req.body;

    if (!userId) {
      throw new Error('존재하지 않는 상대입니다.');
    }
    const result = await letterService.createLetterTo(myId, userId, content, sendDate, receiveDate);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 모든 내화 내역 조회(path parameter 사용)
lettersRouter.get('/:userId', loginRequired, async (req, res, next) => {
  try {
    const myId = req.userId;
    const { userId } = req.params;

    const result = await letterService.getLettersById(myId, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 쪽지 상세 내용 (path parameter 이용)
lettersRouter.get('/:userId/:letterId', loginRequired, async (req, res, next) => {
  try {
    const myId = req.userId;
    const { userId, letterId } = req.params;

    const result = await letterService.getLetterById(myId, userId, letterId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// isRead
lettersRouter.patch('/:letterId', loginRequired, async (req, res, next) => {
  try {
    const myId = req.userId;
    const { letterId } = req.params;
    const { isRead } = req.body
    const result = await letterService.updateLetterById(myId, letterId, isRead);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 상대방과 나웠던 쪽지 전체 삭제 (path parameter 이용)
lettersRouter.patch('/:userId', loginRequired, async (req, res, next) => {
  try {
    const myId = req.userId;
    const { userId } = req.params;
    const result = await letterService.deleteLetterById(myId, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { lettersRouter };
