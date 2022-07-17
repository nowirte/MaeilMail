/* eslint-disable no-nested-ternary */
import { Op, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { User, Favor } from '../db/models';

const include = [{ model: Favor }];
class UserService {
  constructor(param1, param2) {
    this.User = param1;
    this.Favor = param2;
  }

  async validateEmail(filter) {
    const result = await this.User.findOne({
      where: filter,
    });
    return result;
  }

  async addUser(userInfo) {
    const { nickname, email, password, gender, location, latitude, longitude, birthday } = userInfo;
    const emailResult = await this.User.findOne({
      where: { email, status: 'active', oauth: 'local' },
    });
    if (emailResult) {
      throw new Error('중복된 이메일입니다.');
    }

    const nicknameResult = await this.User.findOne({
      where: { nickname, status: 'active' },
    });
    if (nicknameResult) {
      throw new Error('중복된 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = {
      nickname,
      email,
      password: hashedPassword,
      status: 'active',
      oauth: 'local',
      gender,
      location,
      latitude,
      longitude,
      birthday,
    };

    const newUser = await this.User.create(newUserInfo);

    return newUser;
  }

  async addGoogleUser(userInfo) {
    const { email } = userInfo;
    const result = await this.User.findOne({
      where: { email, status: 'active', oauth: 'google' },
    });
    if (result) {
      throw new Error('중복된 이메일입니다.');
    }

    const newUser = await this.User.create(userInfo);

    return newUser;
  }

  async updateUser(userId, body, del) {
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
      currentPassword,
      newPassword,
    } = body;

    // validate
    async function validatePassword(id, input) {
      const user = await User.findOne({
        where: { user_id: Number(id), status: 'active' },
        attributes: ['password'],
      });
      if (!user) {
        throw new Error('유저를 찾을 수 없습니다.')
      }
      const passwordInDB = user.dataValues.password;
      const result = await bcrypt.compare(input, passwordInDB);
      return result;
    }

    if (!currentPassword) {
      throw new Error('현재 비밀번호가 필요합니다.');
    }

    const validate = await validatePassword(userId, currentPassword);
    if (!validate) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 유저 필터
    const filter = {
      where: { user_id: Number(userId), status: 'active' },
    };

    // 회원 탈퇴
    if (del) {
      const result = await this.User.update({ status: 'inactive' }, filter);
      if (result[0] !== 1) {
        throw new Error('탈퇴가 정상적으로 이루어지지 않았습니다.');
      }
      return { message: '정상적으로 탈퇴되었습니다.' };
    }

    // 회원 정보 수정
    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null

    const toUpdate = {
      ...(nickname && { nickname }),
      ...(hashedPassword && { password: hashedPassword }),
      ...(gender && { gender }),
      ...(birthday && { birthday }),
      ...(language && { language }),
      ...(location && { location }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      ...(profileText && { profileText }),
      ...(profileImage && { profileImage }),
    };

    const userAffectedRows = await this.User.update(toUpdate, filter);

    if (userAffectedRows === 0) {
      throw new Error('업데이트 대상을 찾지 못했습니다.');
    }

    if (favor) {
      await this.Favor.findOrCreate({
        where: { userId: Number(userId) },
      });
      const favorAffectedRows = await this.Favor.update(favor, {
        where: { userId: Number(userId) },
      });
      if (favorAffectedRows === 0) {
        throw new Error('업데이트 대상을 찾지 못했습니다.');
      }
    }

    const updated = await this.getUserById(userId);
    return updated;
  }

  async updateGoogleUser(id, body) {
    const { nickname, gender, birthday, language, location, latitude, longitude } = body;

    const toUpdate = {
      ...(nickname && { nickname }),
      ...(gender && { gender }),
      ...(birthday && { birthday }),
      ...(language && { language }),
      ...(location && { location }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      status: 'active',
    };

    const affectedRows = await this.User.update(toUpdate, { where: { user_id: id, status: 'temp', oauth: 'google' } });
    if (affectedRows === 0 ) {
      throw new Error('업데이트 대상을 찾지 못했습니다.');
    }
    const updated = await this.getUserById(id);

    return updated
  }

  async getUsers() {
    const users = await this.User.findAll({ include });
    return users;
  }

  async getUserById(id) {
    const user = await this.User.findOne({
      where: { user_id: Number(id) },
      include,
    });
    if (!user) {
      throw new Error('일치하는 사용자 정보가 존재하지 않습니다.');
    }
    return user;
  }

  async getUsersBySearch(nickname) {
    const users = await this.User.findAll({
      where: { nickname: { [Op.regexp]: nickname }, status: 'active' },
      include,
    });
    return users;
  }

  async getUsersRecommended() {
    const users = await this.User.findAll({
      where: { status: 'active' },
      order: [Sequelize.fn('RAND')],
      limit: 10,
    });
    return users;
  }
}

const userService = new UserService(User, Favor);

export { userService };
