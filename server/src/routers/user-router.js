import { Router } from 'express';
import passport from 'passport';
import { userService } from '../services';

const userRouter = Router();

userRouter.get('/', passport.authenticate('jwt'), async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    const info = userService.getUserById(id);
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

userRouter.patch('/', passport.authenticate('jwt'), async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    const {
      nickname,
      gender,
      birthday,
      language,
      location,
      latitude,
      longitude,
      profileText,
      profileImage,
      favor,
    } = req.body;

    const toUpdate = {
      ...(nickname && { nickname }),
      ...(gender && { gender }),
      ...(birthday && { birthday }),
      ...(language && { language }),
      ...(location && { location }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      ...(profileText && { profileText }),
      ...(profileImage && { profileImage })
    };

    const info = userService.updateUser((id), false, toUpdate, favor);
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

userRouter.patch(
  '/password',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) {
        throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
      }
      const { newPassword, currentPassword } = req.body;

      if (!currentPassword) {
        throw new Error('현재 비밀번호가 필요합니다.');
      }

      const updated = await userService.updateUser(
        id,
        currentPassword,
        newPassword, false
      );
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.patch(
  '/withdrawal',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) {
        throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
      }

      const { password } = req.body;

      if (!password) {
        throw new Error('현재 비밀번호가 필요합니다.');
      }

      const updated = await userService.updateUser(id, password, false, false);
      if (!updated.status) {
        res
          .status(200)
          .json({ message: '탈퇴 절차가 정상적으로 처리되었습니다.' });
      }
    } catch (err) {
      next(err);
    }
  }
);

export { userRouter };
