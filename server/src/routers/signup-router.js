import passport from 'passport';
import { Router } from 'express';
import { userService } from '../services';

const signupRouter = Router();

signupRouter.post('/', async (req, res, next) => {
    try {
        const { nickname, email, password, gender, location, latitude, longitude, birthday } = req.body
        const info = { nickname, email, password, gender, location, latitude, longitude, birthday }
        const user = await userService.addUser(info) 
        res.status(201).json(user)
    } catch (err) {
        next(err);
    }
});

signupRouter.patch('/google', passport.authenticate('jwt'), async (req, res, next) => {
    try {
        const { id } = req.user
        const info = userService.updateGoogleUser(id, req.body);
        res.status(200).json(info);
    } catch (err) {
        next (err)
    }
})

export { signupRouter };
