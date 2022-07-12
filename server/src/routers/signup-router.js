import { Router } from 'express';
import { userService } from '../services/user-service';


const signupRouter = Router();

signupRouter.post('/', (req, res, next) => {
    try{
        const { nickname, email, password, gender, birthday } = req.body
        const info = { nickname, email, password, gender, birthday }
        const user = await userService.addUser(info) 
        res.status(201).json(user)
    } catch (err) {
        next(err);
    }
});

export { signupRouter };
