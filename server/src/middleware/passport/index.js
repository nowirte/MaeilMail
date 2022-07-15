import passport from 'passport';
import { local, google, jwt, jwtAdmin } from './strategies';

// eslint-disable-next-line func-names
export default function () {
  passport.use('google', google);
  passport.use('local', local);
  passport.use('jwt', jwt);
  passport.use('jwtAdmin', jwtAdmin);
}