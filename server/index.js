require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const customAuthMiddleware = require('./middleware/custom-auth-middleware');
const express = require('express');
const db = require('./models');
const app = express();
const morgan = require('morgan');

const userController = require('./controllers/user-controller');

const PORT = process.env.PORT || 3000;
const development = process.env.NODE_ENV !== 'production';

if (development) {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(customAuthMiddleware);

app.use(userController);

db.sequelize.sync({ force: development }).then(() => {
  const { User } = db;
  User.create({ username: 'test', password: 'test' });
  app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
});
