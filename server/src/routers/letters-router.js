/* eslint-disable no-console */
import { Router } from 'express';
import { letterService } from '../services';


const lettersRouter = Router();

// 편지 주고받는 사람들 목록(Query String 이용)
lettersRouter.get('/', async (req, res, next) => { 
  try {
    const myId = Number(req.query.contact);
    const result = await letterService.getContactUsers(myId);
    
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});


// 편지쓰기 (path parameter 사용)
lettersRouter.post('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;

    if (!userId) {
      throw new Error('존재하지 않는 상대입니다.');
    }
    const result = await letterService.createLetterTo(2, userId, content);

    res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);
// 모든 내화 내역 조회(path parameter 사용) 
lettersRouter.get('/:userId',async (req, res, next) => {
  try {
    const {userId} = req.params;

    const result = await letterService.getLettersById(1, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
    }
  }
);

// 쪽지 상세 내용 (path parameter 이용)
lettersRouter.get('/:userId/:letterId', async (req, res, next) => {
    try {
      const { userId, letterId } = req.params;
      const result = await letterService.getLetterById(1, userId, letterId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

// 상대방과 나웠던 쪽지 전체 삭제 (path parameter 이용)
lettersRouter.patch('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await letterService.deleteLetterById(1, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { lettersRouter };
