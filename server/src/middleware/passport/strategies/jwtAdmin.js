import { ExtractJwt as Extract, Strategy } from 'passport-jwt';
import { userService } from '../../../services/user-service';

const config = {
  jwtFromRequest: Extract.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const verify = async (jwtPayload, done) => {
  try {
    const {status} = await userService.getUserById({ where: { id: jwtPayload.id } });
    if (status === "admin") {
      done(null, status);
      return;
    }
    done(null, false, { reason: '권한이 없습니다.' });
  } catch (err) {
    console.error(err);
    done(err);
  }
};


const jwtAdmin = new Strategy(config, verify);
export { jwtAdmin };