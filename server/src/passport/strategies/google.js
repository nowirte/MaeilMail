import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import { User } from '../../db';

// 구글 OAuth 설정
const config = {
  clientID: process.env.GOOGLE_OAUTH_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET, 
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser({ email, name }) {
  const user = await User.findOne({
    email,
  });

  if (user) return user;

  // 사용자 이름으로 hash화한 비밀번호 새성
  const hashedPassword = await bcrypt.hash(name, 10); 
  const createdNewUser = await User.create({
    email,
    password: hashedPassword,
  });
  return createdNewUser;
}

const google = new GoogleStrategy.Strategy(
  config,
  async (a, b, profile, done) => {
    const { email, name } = profile._json;

    try {
      const user = await findOrCreateUser({ email, name });
      done(null, {
        userId: user.user_id,
      });
    } catch (e) {
      done(e, null);
    }
  },
) 

export default google