import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'
import passport from 'passport';
import passportConfig from './passport';
import { loginRouter } from './routers/login-router'
passportConfig();
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/login', loginRouter)

export { app };