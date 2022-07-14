import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/setUserToken';

const loginRouter = Router();

loginRouter.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    session: false,
  }),
  async (req, res, next) => {
    try {
      // 토큰 제공
      await setUserToken(req.user, res);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
);

// 구글 로그인
loginRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

loginRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  async (req, res, next) => {
    try {
      // 토큰 제공
      await setUserToken(req.user, res);
      res.redirect('/googleSignup');
    } catch (err) {
      next(err);
    }
  }
);

export { loginRouter };
