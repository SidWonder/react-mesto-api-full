/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const NotFoundError = require('./errors/not-found-err');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./middlewares/cors');
// const options = {
//   origin: [
//     'http://localhost:3000',
//     'https://sidwonder.mesto.nomoredomains.club',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
//   credentials: true,
// };

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', corsOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.disable('x-powered-by');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/,
      ),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .unknown(true),
}), createUser);

app.use(requestLogger);
app.use(auth);

app.use('/users', users);
app.use('/cards', cards);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal Server error' : message,
  });
  next();
});

app.listen(PORT, () => {
});
