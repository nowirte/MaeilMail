/* eslint-disable no-nested-ternary */
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { User, Favor } from '../db/models';

const include = [{ model: Favor }];
class UserService {
  constructor(param) {
    this.User = param;
  }

  async addUser(userInfo) {
    const { nickname, email, password, gender } = userInfo;

    const emailResult = await this.User.findOne({
      where: { email, status: 'active' },
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
      gender,
    };

    const newUser = await this.User.create(newUserInfo);

    return newUser;
  }

  async addNullUser(userInfo) {
    const { email } = userInfo;

    const result = await this.User.findOne({
      where: { email, status: 'active' },
    });
    if (result) {
      throw new Error('중복된 이메일입니다.');
    }

    const newUser = await this.User.create(userInfo);

    return newUser;
  }

  async updateUser(id, password, toUpdate, favor) {
    if (password) {
      const currentPassword = await this.User.findOne(
        { where: { user_id: Number(id) } },
        { attributes: ['password'] }
      );
      if (currentPassword !== password) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
    }
    const newPassword = toUpdate;
    const hashedPassword =
      password && toUpdate ? await bcrypt.hash(newPassword, 10) : null;

    const update = !password
      ? toUpdate
      : !toUpdate
      ? { status: 'inactive' }
      : { password: hashedPassword };

    const filter = {
      where: { user_id: Number(id), status: 'active' },
      include,
    };

    await this.User.update(update, filter);
    await this.User.findOne(filter).then(async user => {
      if (user) {
        await user.Favor.updateAttributes(favor);
      } else {
        throw new Error('유저의 관심사를 가져올 수 없습니다.');
      }
    });

    const updated = await this.getUserById(id);

    return updated;
  }

  async getUsers() {
    const users = await this.User.findAll({ include });
    return users;
  }

  async getUserById(id) {
    const user = await this.User.findByPk({
      where: { id: Number(id) },
      include,
    });
    if (!user) {
      throw new Error('일치하는 사용자 정보가 존재하지 않습니다.');
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.User.findOne({
      where: { email, status: 'active' },
      include
    });
    if (!user) {
      throw new Error(
        '해당 이메일과 일치하는 사용자 정보가 존재하지 않습니다.'
      );
    }
    return user;
  }

  async getUsersBySearch(nickname) {
    const users = await this.User.findAll({
      where: { nickname: { [Op.regexp]: nickname }, status: 'active' },
      include
    });
    return users;
  }

  async getUsersRecommended() {
    const users = await this.User.findAll({
      where: { status: 'active' },
      order: 'random()',
      limit: 10,
    });
    return users;
  }
}

const userService = new UserService(User);

export { userService };
