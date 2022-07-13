import { Router } from 'express';
import passport from 'passport';
import { userService } from '../services/user-service';

const userRouter = Router();

// 관리자
userRouter.get(
  '/admin',
  passport.authenticate('jwtAdmin'),
  async (req, res, next) => {
    try {
      const users = userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  '/admin/:userId',
  passport.authenticate('jwtAdmin'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = userService.getUser(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

// 검색
userRouter.get(
    '/search',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { q } = req.query;
        if (!q) {
            throw new Error ('검색어를 입력해주세요')
        } 
        const result = userService.getUserByFilter(q)
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

userRouter.get(
    '/search/:userId',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { userId } = req.params;
        const user = userService.getUser(userId);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
    }
  );

// 추천
userRouter.get(
    '/recommend',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const result = userService.getUserRecommend
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

userRouter.get(
    '/search/:userId',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { userId } = req.params;
        const user = userService.getUser(userId);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
    }
  );

export { userRouter };