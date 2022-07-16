import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './middleware/passport';
import { loginRouter, authRouter, usersRouter } from './routers';
import { errorHandler } from './middleware';
import { db } from './db';

passportConfig();
dotenv.config();

const app = express();
const { sequelize } = db;
sequelize.sync({ force: false });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/api/login', loginRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);
export { app };
