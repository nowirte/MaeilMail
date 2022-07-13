import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import {db} from '../models/index';
import {User} from '../models/user';

dotenv.config()
const app = express();
const {sequelize} = db

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync({force: false});
app.get("/", (req, res) => {return res.send("express!")});

app.get("/user", async (req, res) => {
    try {
      const data = await User.create({
        nickname: "maruhod23111fa",
        password: "1234567",
        email: "abc@abcde111ffagfgd.com"
    });
      res.send(data); 
    } catch (error) {
        console.log(error);
    }
});

app.get("/user/find", async (req, res) => {
  try {
    const data = await User.findAll({});
    res.send(data); 
  } catch (error) {
      console.log(error);
  }
});

export { app };