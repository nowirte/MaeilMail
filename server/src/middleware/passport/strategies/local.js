import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { userService } from '../../../services';

const config = { usernameField: 'email', passwordField: 'password', session: false };

const verify = async (email, password, done) => {
  try {
    const user = await userService.validateEmail(email, 'local');
    if (!user) {
      done(null, false, { reason: '계정이 존재하지 않습니다.' });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      done(null, { userId: user.userId, status: user.status });
      return;
    }
    done(null, false, { reason: '비밀번호가 다릅니다.' });
  } catch (err) {
    done(err);
  }
};

const local = new Strategy(config, verify);
export { local };
