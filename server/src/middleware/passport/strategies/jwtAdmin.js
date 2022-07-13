import { ExtractJwt as Extract, Strategy } from 'passport-jwt';
import { User } from '../../../db/models';

const config = {
  jwtFromRequest: Extract.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const verify = async (jwtPayload, done) => {
  try {
    //  status 값만 가져오자
    const userStatus = await User.findOne({ where: { id: jwtPayload.id } });
    if (userStatus === "admin") {
      done(null, true);
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