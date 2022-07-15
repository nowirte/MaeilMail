/* eslint-disable import/named */
import { Router } from 'express';
import { loginRequired } from '../middleware';
import { userService } from '../services';

const userRouter = Router();

userRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    const id = req.UserId;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    const info = await userService.getUserById(id);
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

userRouter.patch('/', loginRequired, async (req, res, next) => {
  try {
    const id = req.UserId;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    const { nickname, gender, birthday, language, location, latitude, longitude, profileText, profileImage, favor } =
      req.body;

    const toUpdate = {
      ...(nickname && { nickname }),
      ...(gender && { gender }),
      ...(birthday && { birthday }),
      ...(language && { language }),
      ...(location && { location }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      ...(profileText && { profileText }),
      ...(profileImage && { profileImage }),
    };
    const info = await userService.updateUser(id, false, toUpdate, favor);
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

userRouter.patch('/password', loginRequired, async (req, res, next) => {
  try {
    const id = req.UserId;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }
    const { newPassword, currentPassword } = req.body;

    if (!currentPassword) {
      throw new Error('현재 비밀번호가 필요합니다.');
    }

    const updated = await userService.updateUser(id, currentPassword, newPassword, false);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

userRouter.patch('/withdrawal', loginRequired, async (req, res, next) => {
  try {
    const id = req.UserId;
    if (!id) {
      throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
    }

    const { password } = req.body;

    if (!password) {
      throw new Error('현재 비밀번호가 필요합니다.');
    }

    const updated = await userService.updateUser(id, password, false, false);
    console.log(updated)
    if (updated.status) {
      res.status(200).json({ message: '탈퇴 절차가 정상적으로 처리되었습니다.' });
    }
  } catch (err) {
    next(err);
  }
});

export { userRouter };
