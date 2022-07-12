import { User } from '../db/models';
import bcrypt from 'bcrypt';

class UserService {
    constructor(User) {
        this.User = User;
    }

    async addUser(userInfo) {
        const { nickname, email, password } = userInfo

        const email_result = await this.User.findBy(email);
        if (email_result) {
            throw new Error("중복된 이메일입니다.")
        }

        const nickname_result = await this.User.findBy(nickname);
        if (nickname_result) {
            throw new Error("중복된 닉네임입니다.")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserInfo = { fullName, email, password: hashedPassword };
    
        const newUser = await this.userModel.create(newUserInfo);
    
        return newUser;
    }
}

const userService = new UserService(User)

export { userService }