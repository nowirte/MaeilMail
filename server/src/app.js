import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { db } from './db';

dotenv.config();
const app = express();
const { sequelize } = db;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync({ force: false });
app.get('/', (req, res) => {
  return res.send('express!');
});

export { app };