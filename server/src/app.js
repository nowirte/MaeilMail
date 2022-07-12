import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import {db} from './db/config/db.config.js';
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("express!"));
app.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM user WHERE user_id = ${id};`;
        const [user] = await db.promise().query(sql);
        console.log(user[0].nickname);
        res.json(user);    
    } catch (error) {
        console.log(error);
    }
});

export { app };