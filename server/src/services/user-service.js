import bcrypt from 'bcrypt';
import { User } from '../db/models';

class UserService {
    constructor(param) {
        this.User = param;
    }

    async addUser(userInfo) {
        const { nickname, email, password } = userInfo

        const emailResult = await this.User.findBy(email);
        if (emailResult) {
            throw new Error("중복된 이메일입니다.")
        }

        const nicknameResult = await this.User.findBy(nickname);
        if (nicknameResult) {
            throw new Error("중복된 닉네임입니다.")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserInfo = { nickname, email, password: hashedPassword };
    
        const newUser = await this.userModel.create(newUserInfo);
    
        return newUser;
    }
}

const userService = new UserService(User)

export { userService }