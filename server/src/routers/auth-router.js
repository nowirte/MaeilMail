/* eslint-disable import/named */
import { Router } from 'express';
import passport from 'passport';
import { loginRequired, tempAllowed } from '../middleware';
import { userService } from '../services';
import { setUserToken, upload } from '../utils';

const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
  passport.authenticate(
    'local',
    async (error, user, info) => {
      try {
        if (error) {
          throw new Error(error);
        }
        if (!user) {
          res.status(401).json(info);
          return;
        }
        await setUserToken(user, res);
      } catch (err) {
        next(err);
      }
    },
    {
      session: false,
    }
  )(req, res, next);
});

// 구글 로그인
authRouter.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/login/google/callback',
  passport.authenticate('google', { session: false, failureMessage: true }),
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
    const info = await userService.getUserById(Number(userId));
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

authRouter.patch('/me', tempAllowed, async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    // isGoogle: 구글 로그인 했으나 회원 정보 입력 안 한 경우
    const { isGoogle } = req.query;

    const result = isGoogle
      ? await userService.updateGoogleUser(userId, req.body)
      : await userService.updateUser(Number(userId), req.body, false);

    if (!result) {
      throw new Error('업데이트 된 정보를 불러오지 못했습니다.');
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

authRouter.patch('/me/image', loginRequired, upload.single('img'), async (req, res) => {
  const { userId, file } = await req;
  const imageUrl = await file.location;
  if (imageUrl) {
    await userService.updateUserProfileImage(Number(userId), imageUrl);
    res.json({ imageUrl });
  } else {
    res.json({ result: 'error', message: '이미지가 제대로 업로드되지 않았습니다.' });
  }
});

authRouter.patch('/me/withdrawal', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }

    const result = await userService.updateUser(Number(userId), req.body, true);

    if (!result) {
      throw new Error('업데이트 된 정보를 불러오지 못했습니다.');
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { authRouter };
