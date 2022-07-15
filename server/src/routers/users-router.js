import { Router } from 'express';
// import passport from 'passport';
import { userService } from '../services';
import { loginRequired } from '../middleware';
import { isEmpty } from '../utils';

const usersRouter = Router();

// 관리자 passport.authenticate('jwtAdmin')
usersRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    if (req.status === 'admin') {
      if (isEmpty(req.qeury)) {
        const users = await userService.getUsers();
        res.status(200).json(users);
      } else {
        const { userId } = req.query;
        if (!userId) {
          throw new Error('url 쿼리를 다시 확인해주세요');
        }
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
      }
    } else {
      throw new Error('관리자만 접근할 수 있습니다.');
    }
  } catch (err) {
    next(err);
  }
});

// 검색
usersRouter.get('/search', loginRequired, async (req, res, next) => {
  try {
    const { nickname, userId } = req.query;
    if (!nickname) {
      throw new Error('검색어를 입력해주세요');
    }
    const result = await userService.getUsersBySearch(nickname);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/search/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// 추천
usersRouter.get('/recommend', loginRequired, async (req, res, next) => {
  try {
    const result = await userService.getUsersRecommended();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/recommend/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export { usersRouter };
