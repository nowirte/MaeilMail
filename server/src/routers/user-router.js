import { Router } from 'express';
import passport from '../middleware/passport';
import { userService } from '../services/user-service';

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

userRouter.patch(
  '/',
  passport.authenticate('jwt'),
  async (req, res, next) => {
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
        ...(profileImage && { profileImage }),
        ...(favor && { favor }),
      };

      const info = userService.updateUser(id, false, toUpdate, 1);
      res.status(200).json(info);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.patch(
  '/password',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) {
        throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
      }
      const {
        nickname,
        currentPassword,
        newPassword,
        gender,
        birthday,
        location,
        latitude,
        longitude,
        profileText,
        profileImage,
        favor,
      } = req.body;

      if (!currentPassword) {
        throw new Error('현재 비밀번호가 필요합니다.');
      }

      const toUpdate = {
        ...(nickname && { nickname }),
        ...(newPassword && { newPassword }),
        ...(gender && { gender }),
        ...(birthday && { birthday }),
        ...(location && { location }),
        ...(latitude && { latitude }),
        ...(longitude && { longitude }),
        ...(profileText && { profileText }),
        ...(profileImage && { profileImage }),
        ...(favor && { favor }),
      };

      const updated = await userService.updateUser(id, currentPassword, {newPassword: newPassword}, 2);
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

      const updated = await userService.updateUser(id, password, false, 3);
      if (!updated.status) {
        res.status(200).json({message: "탈퇴 절차가 정상적으로 처리되었습니다."});
      }
    } catch (err) {
      next(err);
    }
  }
);

export { userRouter };