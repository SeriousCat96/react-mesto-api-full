const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error');
const authHandler = require('./middlewares/auth');
const notFoundHandler = require('./middlewares/resourceNotFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(authHandler);

app.use('/cards', cards);
app.use('/users', users);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT);
