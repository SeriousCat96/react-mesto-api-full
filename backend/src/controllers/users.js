const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { getError } = require('../utils/errors');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.json(users))
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
