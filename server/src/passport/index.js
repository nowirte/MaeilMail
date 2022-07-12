import passport from 'passport';
import { local, google, jwt } from './strategies';

export default function () {
  passport.use(google);
  passport.use(local);
  passport.use(jwt);
}