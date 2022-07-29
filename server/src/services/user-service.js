/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { Op, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { User, Favor, Language } from '../db/models';
import { reduceObjToArray, reduceArrayToObject } from '../utils';

const include = [
  { model: Favor, attributes: { exclude: ['favor_id', 'user_id', 'created_at', 'updated_at'] } },
  { model: Language, attributes: { exclude: ['language_id', 'user_id', 'created_at', 'updated_at'] } },
];
const attributes = { exclude: ['userId', 'password', 'oauth', 'created_at', 'updated_at'] };
const raw = true;
class UserService {
  constructor(param1, param2, param3) {
    this.User = param1;
    this.Favor = param2;
    this.Language = param3;
  }

  async validateEmail(email, oauth) {
    const filter = { email, oauth, status: { [Op.not]: 'inactive' } };
    const result = await this.User.findOne({
      where: filter,
    });
    return result;
  }

  async validatePassword(id, input) {
    const password = await this.User.findOne({
      where: { user_id: id, status: { [Op.not]: 'inactive' } },
      attributes: ['password'],
      raw,
    });
    const result = await bcrypt.compare(input, password.password);
    return result;
  }

  async addUser(userInfo) {
    const { nickname, email, password, gender, location, latitude, longitude, birthday } = userInfo;
    const emailResult = await this.User.findOne({
      where: { email, status: { [Op.not]: 'inactive' }, oauth: 'local' },
    });
    const nicknameResult = await this.User.findOne({
      where: { nickname, status: { [Op.not]: 'inactive' } },
    });

    if (emailResult && nicknameResult) {
      throw new Error('이메일과 닉네임이 중복되었습니다.');
    } else if (emailResult) {
      throw new Error('중복된 이메일입니다.');
    } else if (nicknameResult) {
      throw new Error('중복된 닉네임입니다.');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const newUserInfo = {
      ...(nickname && { nickname }),
      ...(email && { email }),
      ...(hashedPassword && { password: hashedPassword }),
      ...(gender && { gender }),
      ...(birthday && { birthday }),
      ...(location && { location }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      status: 'active',
      oauth: 'local',
    };

    const newUser = await this.User.create(newUserInfo);

    const { userId } = newUser.dataValues;

    await this.Favor.create({ userId });
    await this.Language.create({ userId });

    return newUser;
  }

  async addGoogleUser(email) {
    const hashed = await bcrypt.hash('google', 10);
    const random = Math.floor(Math.random() * 10000);
    const userInfo = {
      email,
      password: hashed,
      nickname: `google#${random}`,
      status: 'temp',
      gender: 'else',
      oauth: 'google',
    };

    const newUser = await this.User.create(userInfo);

    const { userId } = newUser.dataValues;

    await this.Favor.create({ userId });
    await this.Language.create({ userId });

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

    if (!currentPassword) {
      throw new Error('현재 비밀번호가 필요합니다.');
    }

    const validate = await this.validatePassword(userId, currentPassword);
    if (!validate) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 유저 필터
    const filter = {
      where: { userId, status: { [Op.not]: 'inactive' } },
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
    const languageUpdate = await reduceArrayToObject(language);
    const favorUpdate = await reduceArrayToObject(favor);

    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null;

    const toUpdate = {
      ...(nickname && { nickname }),
      ...(hashedPassword && { password: hashedPassword }),
      ...(gender && { gender }),
      ...(birthday && { birthday }),
      ...(location && { location }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      ...(profileText && { profileText }),
      ...(profileImage && { profileImage }),
    };

    const userAffectedRows = await this.User.update(toUpdate, filter);

    if (userAffectedRows === 0) {
      console.log('변경된 정보가 없습니다.');
    }

    if (favorUpdate) {
      await this.Favor.findOrCreate({
        where: { user_id: userId },
      });
      const affected = await this.Favor.update(favorUpdate, {
        where: { user_id: userId },
      });
      if (affected === 0) {
        console.log('관심사 정보에서 변경이 이루어지지 않았습니다.');
      }
    }

    if (languageUpdate) {
      await this.Language.findOrCreate({
        where: { user_id: userId },
      });
      const affected = await this.Language.update(languageUpdate, {
        where: { user_id: userId },
      });
      if (affected === 0) {
        console.log('사용 언어 정보에서 변경이 이루어지지 않았습니다.');
      }
    }

    const updated = await this.getUserById(userId);
    return updated;
  }

  async updateUserProfileImage(userId, profileImage) {
    const affectedRows = await this.User.update({ profileImage }, { where: { userId } });
    if (affectedRows === 0) {
      throw new Error('업데이트 대상을 찾지 못했습니다.');
    }
    const updated = await this.User.findOne({ where: { userId } });

    return updated;
  }

  async updateGoogleUser(userId, body) {
    const { nickname, gender, birthday, language, location, latitude, longitude } = body;

    const nicknameResult = await this.User.findOne({
      where: { nickname },
      status: { [Op.not]: 'inactive' },
    });

    if (nicknameResult) {
      throw new Error('중복된 닉네임입니다.');
    }

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

    const affectedRows = await this.User.update(toUpdate, { where: { userId, status: 'temp', oauth: 'google' } });
    if (affectedRows[0] === 0) {
      throw new Error('업데이트 대상을 찾지 못했습니다.');
    }
    const updated = await this.getUserById(userId);
    const { status } = updated.user.dataValues;
    return status;
  }

  async getUsers() {
    const users = await this.User.findAll({ include, attributes });
    return users;
  }

  async getUserById(userId) {
    const user = await this.User.findOne({
      where: { userId },
      include,
      attributes,
    });
    if (!user) {
      throw new Error('404 not found');
    }

    const favObj = user.dataValues.Favor;
    const langObj = user.dataValues.Language;

    const favorArray = favObj ? await reduceObjToArray(favObj.dataValues) : null;
    const languageArray = langObj ? await reduceObjToArray(langObj.dataValues) : null;

    return { favorArray, languageArray, user };
  }

  async getUsersBySearch(nickname) {
    const users = await this.User.findAll({
      where: { nickname: { [Op.regexp]: nickname }, status: 'active' },
      attributes: ['nickname', 'user_id', 'profile_image'],
    });
    return users;
  }

  async getUsersRecommended() {
    const users = await this.User.findAll({
      where: { status: 'active' },
      attributes: ['nickname', 'user_id', 'profile_image'],
      order: [Sequelize.fn('RAND')],
      limit: 10,
    });
    return users;
  }
}

const userService = new UserService(User, Favor, Language);

export { userService };
