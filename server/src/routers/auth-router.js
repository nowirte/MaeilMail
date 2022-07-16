/* eslint-disable import/named */
import { Router } from 'express';
import passport from 'passport';
import { loginRequired } from '../middleware';
import { userService } from '../services';
import { setUserToken } from '../utils';

const authRouter = Router();

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    session: false,
  }),
  async (req, res, next) => {
    try {
      // 토큰 제공
      await setUserToken(req.user, res);
    } catch (err) {
      next(err);
    }
  }
);

// 구글 로그인
authRouter.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  async (req, res, next) => {
    try {
      await setUserToken(req.user, res);
    } catch (err) {
      next(err);
    }
  }
);

// 마이페이지
authRouter.get('/me', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req;
    const info = await userService.getUserById(userId);
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

authRouter.patch('/me', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    // del: 회원 탈퇴 여부, isGoogle: 구글 로그인 했으나 회원 정보 입력 안 한 경우
    const { del, isGoogle } = req.query;
    const result = isGoogle ? 
        await userService.updateGoogleUser(userId, req.body)
      : await userService.updateUser(userId, req.body, del);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { authRouter };
