import { Router } from 'express';
import passport from '../passport';
import { userService } from '../services/user-service';

const userRouter = Router();

userRouter.get('/', passport.authenticate('jwt'))