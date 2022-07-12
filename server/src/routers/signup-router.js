import { Router } from 'express';
import { userService } from '../services/user-service';

const signupRouter = Router();

signupRouter.post('/', async (req, res, next) => {
    try{
        const user = await userService.addUser(req.body) 
        res.status(201).json(user)
    } catch (err) {
        next(err);
    }
});

export { signupRouter };
