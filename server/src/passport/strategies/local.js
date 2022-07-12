import { Strategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const config = { usernameField: 'email', passwordField: 'password', session: false };

const verify = async (email, password, done) => {
  try {
    const user = User.findOne({ where: { email } });
    if (!user) {
      done(null, false, { reason: '계정이 존재하지 않습니다.' });
      return;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      done(null, { userId: user.user_id, status: user.status });
      return;
    }
    done(null, false, { reason: '비밀번호가 다릅니다.' });
  } catch (err) {
    console.error(err);
    done(err);
  }
};

passport.use(new Strategy(config, verify))
// const local = new Strategy(config, verify);
// export { local };