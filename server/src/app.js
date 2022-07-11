import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("express!"));

app.use("user", userRouter);
app.use("study", studyRouter);


export { app };