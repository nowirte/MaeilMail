import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

// 구글 OAuth 설정
const config = {
  clientID: process.env.GOOGLE_OAUTH_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser({ email, name }) {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }

  const hashed = await bcrypt.hash(name, 10);
  const newUser = await User.create({
    email,
    password: hashed,
  });

  if (!newUser) {
    throw new Error('알 수 없는 이유로 계정이 생성되지 않았습니다.');
  }

  return newUser;
}

const verify = async (a, b, profile, done) => {
  try {
    const { email, name } = profile._json;
    const user = await findOrCreateUser({ email, name });
    if (user) {
      done(null, { userId: user.user_id, status: user.status });
      return;
    }
  } catch (err) {
    console.error(err);
    done(err);
  }
};

passport.use(new Strategy(config, verify));
// const google = new Strategy.Strategy(config, verify);
// export { google };
