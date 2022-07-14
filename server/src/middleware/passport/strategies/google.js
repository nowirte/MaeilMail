/* eslint-disable no-underscore-dangle */
import { Strategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import { userService } from '../../../services/user-service';

const config = {
  clientID: process.env.GOOGLE_OAUTH_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  // backend router 경로로 callback할 것
  callbackURL: '/login/google/callback',
};

async function findOrCreateUser({ email, name }) {
  const user = await userService.getUserInfoByEmail({ email });
  if (user) {
    return user;
  }

  const hashed = await bcrypt.hash(name, 10);
  const newUser = await userService.addNullUser({
    email,
    password: hashed,
    nickname: hashed,
    status: "google",
    gender: "else"
  });

  if (!newUser) {
    throw new Error('알 수 없는 이유로 계정이 생성되지 않았습니다.');
  }

  return newUser;
}

const verify = async (a, b, profile, done) => {
  try {
    console.log(profile)
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

const google = new Strategy.Strategy(config, verify);
export { google };