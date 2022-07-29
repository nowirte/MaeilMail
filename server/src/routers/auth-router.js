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

    if (!info) {
      res.status(404).json({ reason: 'NotFoundError' });
    }

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
      ? await userService.updateGoogleUser(Number(userId), req.body)
      : await userService.updateUser(Number(userId), req.body);

    if (!result) {
      res.status(404).json({ result: 'error', reason: 'NotFoundError' });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

authRouter.patch('/me/image', loginRequired, upload.single('img'), async (req, res) => {
  const { userId, file } = await req;

  const imageUrl = await file.location;
  if (!imageUrl) {
    throw new Error('이미지가 제대로 업로드되지 않았습니다.');
  }

  const result = await userService.updateUserProfileImage(Number(userId), imageUrl);
  if (result === 0) {
    throw new Error('업데이트가 제대로 이루어지지 않았습니다.');
  }

  res.status(200).json({ imageUrl, message: '정상적으로 업데이트되었습니다.' });
});

authRouter.patch('/me/withdrawal', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }

    const result = await userService.inactivateUser(Number(userId), req.body);
    if (result === 0) {
      throw new Error('탈퇴가 정상적으로 이루어지지 않았습니다.');
    }
    res.status(200).json({ message: '정상적으로 탈퇴되었습니다.' });
  } catch (err) {
    next(err);
  }
});

export { authRouter };
