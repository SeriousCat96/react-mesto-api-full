const User = require('../models/user');
const { getError } = require('../utils/errors');
const errors = require('../utils/messages');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMe = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) throw new NotFoundError(errors.http.notFound.format('Пользователя'));
    return res.json(user);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.json(users))
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.getUser = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) throw new NotFoundError(errors.http.notFound.format('Пользователя'));
    return res.json(user);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.setAvatar = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) throw new NotFoundError(errors.http.notFound.format('Пользователя'));
    return res.json(user);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

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
      if (!user) throw new NotFoundError(errors.http.notFound.format('Пользователя'));
      return res.json(user);
    })
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};
