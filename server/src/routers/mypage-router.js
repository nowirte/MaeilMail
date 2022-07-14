import { Router } from 'express';
import passport from '../middleware/passport';
import { userService } from '../services/user-service';

const mypageRouter = Router();

mypageRouter.get('/', passport.authenticate('jwt'), async (req, res, next) => {
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

mypageRouter.patch(
  '/',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) {
        throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
      }
      const { toUpdate } = req.body;
      const info = userService.updateUser(id, toUpdate);
      res.status(200).json(info);
    } catch (err) {
      next(err);
    }
  }
);

mypageRouter.patch(
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
        password,
        gender,
        birthday,
        latitude,
        longitude,
        profileText,
        profileImage,
        favor,
      } = req.body;

      if (!currentPassword) {
        throw new Error('현재 비밀번호가 필요합니다.');
      }

      const requriedInfo = { id, currentPassword };
      const toUpdate = {
        ...(nickname && { nickname }),
        ...(password && { password }),
        ...(gender && { gender }),
        ...(birthday && { birthday }),
        ...(latitude && { latitude }),
        ...(longitude && { longitude }),
        ...(profileText && { profileText }),
        ...(profileImage && { profileImage }),
        ...(favor && { favor }),
      };

      const updated = await userService.updateUser(requriedInfo, toUpdate);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
);

mypageRouter.patch(
  '/withdrawal',
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) {
        throw new Error('토큰에서 id가 정상적으로 추출되지 않았습니다.');
      }

      const { currentPassword } = req.body;
      if (!currentPassword) {
        throw new Error('현재 비밀번호가 필요합니다.');
      }

      const requiredInfo = { id, currentPassword };
      const toUpdate = { status: false };

      const updated = await userService.updateUser(requiredInfo, toUpdate);
      if (!updated.status) {
        res.status(200).json({message: "탈퇴 절차가 정상적으로 처리되었습니다."});
      }
    } catch (err) {
      next(err);
    }
  }
);

export { mypageRouter };
