import { Router } from 'express';
// import passport from 'passport';
import { userService } from '../services';
import { loginRequired } from '../middleware'

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
  try {
      const { nickname, email, password, gender, location, latitude, longitude, birthday } = req.body
      const info = { nickname, email, password, gender, location, latitude, longitude, birthday }
      const user = await userService.addUser(info) 
      res.status(201).json(user)
  } catch (err) {
      next(err);
  }
});

usersRouter.patch('/', loginRequired, async (req, res, next) => {
  try {
      const { isGoogle } = req.query;
      if (isGoogle) {
        const { id } = req.user
        const info = userService.updateGoogleUser(id, req.body);
        res.status(200).json(info);
      } else {
        throw new Error('비정상적인 접근입니다.')
      }
  } catch (err) {
      next (err)
  }
})


// 관리자 passport.authenticate('jwtAdmin')
usersRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    const { isAdmin, search, recommend } = req.query;
    if (isAdmin) {
      if (req.status !== 'admin') {
        throw new Error('관리자만 접근할 수 있습니다.');
      }
      const users = await userService.getUsers();
      res.status(200).json(users);
    } else if (search) {
      if (search === '') {
        throw new Error('검색어를 입력해주세요');
      }
      const result = await userService.getUsersBySearch(search);
      res.status(200).json(result);
    } else if (recommend) {
      const result = await userService.getUsersRecommended();
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export { usersRouter };
