/* eslint-disable no-underscore-dangle */
import { Strategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import { userService } from '../../../services';

const config = {
  clientID: process.env.GOOGLE_OAUTH_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  // backend router 경로로 callback할 것
  callbackURL: '/api/auth/login/google/callback',
};

async function findOrCreateUser(email, name) {
  const user = await userService.validateEmail(email, 'google');

  if (user) {
    return user
  }

  const hashed = await bcrypt.hash(name, 10);
  console.log('google password:', name)
  const random = Math.floor( Math.random() * 10000 )
  const newUser = await userService.addGoogleUser({
    email,
    password: hashed,
    nickname: `google#${random}`,
    status: 'temp',
    gender: 'else',
    oauth: 'google'
  });

  if (!newUser) {
    throw new Error('알 수 없는 이유로 계정이 생성되지 않았습니다.');
  }

  return newUser;
}

const verify = async (a, b, profile, done) => {
  try {
    const { email, name } = profile._json;
    const user = await findOrCreateUser(email, name);
    if (user) {
      done(null, { userId: user.user_id, status: user.status });
      return;
    }
  } catch (err) {
    done(err);
  }
};

const google = new Strategy.Strategy(config, verify);
export { google };
