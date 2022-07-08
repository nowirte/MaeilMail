import cors from 'cors';
import express from 'express';
import passport from 'passport';
import passportConfig from './passport';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerSpec'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passportConfig();
app.use(passport.initialize());

app.get("/", (req, res) => res.send("express!"));

app.use("/api/user", userRouter);
app.use("/api/study", studyRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

export { app };
