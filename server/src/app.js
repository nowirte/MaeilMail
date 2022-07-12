import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("express!"));

export { app };