import { Router } from 'express';
import passport from 'passport';
import { userService } from '../services/user-service';

const usersRouter = Router();

// 관리자
usersRouter.get(
  '/',
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

usersRouter.get(
  '/:userId',
  passport.authenticate('jwtAdmin'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = userService.getUserById(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

// 검색
usersRouter.get(
    '/search',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { nickname } = req.query;
        if (!nickname) {
            throw new Error ('검색어를 입력해주세요')
        } 
        const result = userService.getUserBySearch(nickname)
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

usersRouter.get(
    '/search/:userId',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { userId } = req.params;
        const user = userService.getUserById(userId);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
    }
  );

// 추천
usersRouter.get(
    '/recommend',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const result = userService.getUsersRecommended()
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    }
  );

usersRouter.get(
    '/recommend/:userId',
    passport.authenticate('jwt'),
    async (req, res, next) => {
      try {
        const { userId } = req.params;
        const user = userService.getUserById(userId);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
    }
  );

export { usersRouter };