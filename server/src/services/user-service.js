/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { Op, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { User, Favor, Language } from '../db/models';
import { reduceArrayToObject } from '../utils';

const include = [
  { model: Favor, attributes: { exclude: ['favor_id', 'user_id', 'created_at', 'updated_at'] } },
  { model: Language, attributes: { exclude: ['language_id', 'user_id', 'created_at', 'updated_at'] } },
];
const attributes = { exclude: ['userId', 'password', 'status', 'created_at', 'updated_at'] };
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
    await this.Favor.create({ user_id: userId });
    await this.Language.create({ user_id: userId });

    return { message: '정상적으로 가입되었습니다.' };
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

    await this.Favor.create({ user_id: userId });
    await this.Language.create({ user_id: userId });

    return newUser;
  }

  async updateUser(userId, body) {
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

    await this.User.update(toUpdate, { where: { userId, status: { [Op.not]: 'inactive' } } });

    if (favorUpdate) {
      await this.Favor.findOrCreate({ where: { user_id: userId } });
      await this.Favor.update(favorUpdate, { where: { user_id: userId } });
    }

    if (languageUpdate) {
      await this.Language.findOrCreate({ where: { user_id: userId } });
      await this.Language.update(languageUpdate, { where: { user_id: userId } });
    }

    const updated = await this.getUserById(userId);
    return updated;
  }

  async updateUserProfileImage(userId, profileImage) {
    const affectedRows = await this.User.update({ profileImage }, { where: { userId } });

    return affectedRows[0];
  }

  async updateGoogleUser(userId, body) {
    const { nickname, gender, language, location, latitude, longitude } = body;

    const nicknameResult = await this.User.findOne({ where: { nickname }, status: { [Op.not]: 'inactive' } });
    if (nicknameResult) {
      throw new Error('중복된 닉네임입니다.');
    }

    const toUpdate = {
      ...(nickname && { nickname }),
      ...(gender && { gender }),
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
    const users = await this.User.findAll({ include, attributes, raw });
    return users;
  }

  async getUserById(userId) {
    const user = await this.User.findOne({
      where: { userId },
      include,
      attributes,
    });

    if (!user) {
      return false;
    }

    // const favObj = user.dataValues.Favor;
    // const langObj = user.dataValues.Language;
    // const favorArray = favObj ? await reduceObjToArray(favObj.dataValues) : null;
    // const languageArray = langObj ? await reduceObjToArray(langObj.dataValues) : null;

    return { user };
  }

  async getUsersBySearch(userId, nickname) {
    const users = await this.User.findAll({
      where: { userId: { [Op.not]: userId }, nickname: { [Op.regexp]: nickname }, status: 'active' },
      attributes: ['nickname', 'user_id', 'profile_image'],
    });
    return users;
  }

  async getUsersRecommended(userId) {
    const users = await this.User.findAll({
      where: { userId: { [Op.not]: userId }, status: 'active' },
      attributes: ['nickname', 'user_id', 'profile_image'],
      order: [Sequelize.fn('RAND')],
      limit: 10,
    });
    return users;
  }

  async inactivateUser(userId, body) {
    const { currentPassword } = body;

    if (!currentPassword) {
      throw new Error('현재 비밀번호가 필요합니다.');
    }

    const validate = await this.validatePassword(userId, currentPassword);
    if (!validate) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const filter = { where: { userId, status: { [Op.not]: 'inactive' } } };
    const result = await this.User.update({ status: 'inactive' }, filter);

    return result[0];
  }
}

const userService = new UserService(User, Favor, Language);

export { userService };
