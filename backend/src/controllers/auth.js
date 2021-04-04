const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getError } = require('../utils/errors');
const { devSecret } = require('../utils/constants');

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
        NODE_ENV === 'production' ? JWT_SECRET : devSecret,
        { expiresIn: TOKEN_MAX_AGE },
      );

      return res
        .cookie('token', token, { maxAge: TOKEN_MAX_AGE, httpOnly: true, sameSite: true })
        .end();
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};

module.exports.logout = (req, res) => res
  .cookie('token', '', { maxAge: -1, httpOnly: true, sameSite: true })
  .end();

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
      throw getError(err);
    })
    .catch(next);
};
