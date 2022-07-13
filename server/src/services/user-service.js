import bcrypt from 'bcrypt';
import { User } from '../db/models';

class UserService {
  constructor(param) {
    this.User = param;
  }

  async addUser(userInfo) {
    const { nickname, email, password } = userInfo;

    const emailResult = await this.User.findOne({ where: { email } });
    if (emailResult) {
      throw new Error('중복된 이메일입니다.');
    }

    const nicknameResult = await this.User.findOne({ where: { nickname } });
    if (nicknameResult) {
      throw new Error('중복된 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { nickname, email, password: hashedPassword };

    const newUser = await this.userModel.create(newUserInfo);

    return newUser;
  }

  async getUser(id) {
    const user = await this.User.findByPk(id);
    if (!user) {
      throw new Error('일치하는 사용자 정보가 존재하지 않습니다.');
    }
    return user;
  }
}

const userService = new UserService(User);

export { userService };
