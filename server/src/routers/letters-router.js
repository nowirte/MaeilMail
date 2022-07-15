import { Router } from 'express';
import passport from 'passport';
import { letterService } from '../services';

const lettersRouter = Router();

lettersRouter.get('/', passport.authenticate('jwt'), async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    const result = letterService.getContactUsers();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

lettersRouter.get(
  '?contact=userId',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) {
        throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
      }

      const oponentId = req.query.contact;
      if (!oponentId) {
        throw new Error('URL을 확인해주십시오.');
      }

      const result = letterService.getLettersWith(id, oponentId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

lettersRouter.post(
    '?contact=userId',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { id } = req.user;
        if (!id) {
          throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
        }
  
        const oponentId = req.query.contact;
        if (!oponentId) {
          throw new Error('URL을 확인해주십시오.');
        }
  
        const result = letterService.createLetterTo(id, oponentId);
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

lettersRouter.get(
  '?contact=userId/:letterId',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { letterId } = req.params;
      const result = letterService.getLetterById(letterId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export { lettersRouter };
