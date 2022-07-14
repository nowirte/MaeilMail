import { ExtractJwt as Extract, Strategy } from 'passport-jwt';
import { userService } from '../../../services/user-service';

const config = {
  jwtFromRequest: Extract.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const verify = async (jwtPayload, done) => {
  try {
    const user = await userService.getUserById({ where: { id: jwtPayload.id } });
    if (user) {
      done(null, user);
      return;
    }
    done(null, false, { reason: '인증에 실패하였습니다.' });
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const jwt = new Strategy(config, verify);
export { jwt };