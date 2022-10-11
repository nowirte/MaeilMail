/* eslint-disable import/named */
import { Router } from 'express';
// import passport from 'passport';
import { userService } from '../services';
import { loginRequired } from '../middleware';

const usersRouter = Router();

// 회원 가입
usersRouter.post('/', async (req, res, next) => {
  try {
    const { nickname, email, password, gender, location, latitude, longitude, birthday } = req.body;
    const info = { nickname, email, password, gender, location, latitude, longitude, birthday };
    const result = await userService.addUser(info);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// 조건에 따라 유저들 정보 조회
usersRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req;
    const { isAdmin, search, recommend } = req.query;

    if (isAdmin) {
      if (req.userStatus !== 'admin') {
        throw new Error('관리자만 접근할 수 있습니다.');
      }

      const users = await userService.getUsers();
      res.status(200).json(users);
    } else if (search) {
      const target = search.trim()
      if (!target) {
        throw new Error('검색어를 입력해주세요');
      }

      const result = await userService.getUsersBySearch(userId, target);
      res.status(200).json(result);
    } else if (recommend) {

      const result = await userService.getUsersRecommended(userId);
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(Number(userId));

    if (!user) {
      res.status(404).json("NotFoundError")
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export { usersRouter };
