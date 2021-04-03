const User = require('../models/user');
const responseHandler = require('../utils/response');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.json(users))
    .catch((err) => responseHandler.processError(err, req, res, next));
};

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.json(users))
  .catch((err) => responseHandler.processError(err, req, res, next));

module.exports.getUser = (req, res, next) => User.findById(req.params.userId)
  .then((user) => responseHandler.ensureExists(user, `Пользователя с id=${req.params.userId} не существует`, res, next))
  .catch((err) => responseHandler.processError(err, req, res, next));

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
    .then((user) => responseHandler.ensureExists(user, `Пользователя с id=${req.user._id} не существует`, res, next))
    .catch((err) => responseHandler.processError(err, req, res, next));
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
    .then((user) => responseHandler.ensureExists(user, `Пользователя с id=${req.user._id} не существует`, res, next))
    .catch((err) => responseHandler.processError(err, req, res, next));
};
