const cors = require('cors')
const express = require('express')
const passport = require('passport')
const passportConfig = require('./passport')
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passportConfig();
app.use(passport.initialize());

app.use('/user', userRouter)
app.use('/study', studyRouter)

/**
 * @swagger

 */

app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.js')));
app.get("/", (req, res) => res.send("Hello World!"));


