const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { getError } = require('../utils/errors');
const ConflictError = require('../errors/ConflictError');

const TOKEN_MAX_AGE = 3600000 * 24 * 7;

function getUserJson(data) {
  const user = data.toObject();
  delete user.password;

  return user;
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(({ _id }) => {
      const token = jwt.sign(
        { _id },
        'super-secret-key',
        { expiresIn: TOKEN_MAX_AGE },
      );

      return res
        .cookie('token', token, { maxAge: TOKEN_MAX_AGE, httpOnly: true })
        .end();
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name,
        about,
        avatar,
        email,
        password: hash,
      },
    ))
    .then((user) => res.status(201).json(getUserJson(user)))
    .catch((err) => {
      const error = getError(err);
      if (error instanceof ConflictError) {
        const entries = Object.entries(error.entries).map((v) => `'${v[0]}' ${v[1]}`).join(', ');
        error.message = `Пользователь с ${entries} уже существует`;
      }
      throw error;
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;

  return User.findById(_id)
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователя с id=${req.params.userId} не существует`);
      return res.json(user);
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.json(users))
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.getUser = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) throw new NotFoundError(`Пользователя с id=${req.params.userId} не существует`);
    return res.json(user);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.setAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователя с id=${req.params.userId} не существует`);
      return res.json(user);
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователя с id=${req.params.userId} не существует`);
      return res.json(user);
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};
