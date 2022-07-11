import passport from 'passport';
import { local, google } from './strategies';

export default function () {
  passport.use(google);
  passport.use(local);
}