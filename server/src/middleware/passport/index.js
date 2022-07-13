import passport from 'passport';
import { local, google, jwt, jwtForAdmin } from './strategies';

// eslint-disable-next-line func-names
export default function () {
  passport.use(google);
  passport.use(local);
  passport.use(jwt);
  passport.use(jwtForAdmin)
}