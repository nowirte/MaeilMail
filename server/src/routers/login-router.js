import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

const loginRouter = Router();

loginRouter.post('/', passport.authenticate('local'))


// 구글 로그인
loginRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })
);
loginRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res, next) => {
    try {
      // 토큰 제공
      const user = req.user
      const token = jwt.sign({ userId: user.user_id }, secretKey)
      res.cookie('token', token)
      
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
);

export { loginRouter };
