require('dotenv').config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import customAuthMiddleware from './middleware/custom-auth-middleware';
import express, { urlencoded, json } from 'express';
import db, { sequelize } from './models';
import morgan from 'morgan';

import userController from './controllers/user-controller';
import experimentController from './controllers/experiment-controller';

const app = express();
const PORT = process.env.PORT || 3000;
const development = process.env.NODE_ENV !== 'production';

if (development) {
  app.use(morgan('dev'));
}

// formal middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(bodyParser());

// simple token auth middleware
app.use(customAuthMiddleware);

// controllers
app.use(experimentController);
app.use(userController);

// if in development, drop db with each restart and create a new user
sequelize.sync({ force: development }).then(() => {
  const { User } = db;
  User.create({ username: 'test', password: 'test' });
  app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
});
