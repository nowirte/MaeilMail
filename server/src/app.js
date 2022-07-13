import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './passport';
import { loginRouter, signupRouter, userRouter } from './routers'
import { errorHandler } from './middleware'
import { db } from './db';

passportConfig();
dotenv.config()

const app = express();
const { sequelize } = db;
sequelize.sync({ force: false });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/user', userRouter)

app.use(errorHandler)
export { app };