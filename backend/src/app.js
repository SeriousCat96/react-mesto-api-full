require('dotenv').config();

const { NODE_ENV, DB_CONNECTION_STRING } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const auth = require('./routes/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const authHandler = require('./middlewares/auth');
const notFoundHandler = require('./middlewares/resourceNotFound');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECTION_STRING : 'mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto.nomoredomains.icu',
    'https://seriouscat96.github.io',
  ],
  credentials: true,
};
app.use('*', cors(options));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', auth);

app.use(authHandler);

app.use('/cards', cards);
app.use('/users', users);
app.all('/*', notFoundHandler);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен. Порт: ${PORT}`);
});
