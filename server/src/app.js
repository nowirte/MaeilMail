import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'
import passport from 'passport';
import passportConfig from './passport';
import { loginRouter } from './routers'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passportConfig();
app.use(passport.initialize());
app.use('/login', loginRouter)

export { app };