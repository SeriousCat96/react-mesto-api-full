const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersController = require('../controllers/users');
const defaults = require('../utils/defaults');

router.get('/', usersController.getUsers);

router.get('/me', usersController.getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().trim()
      .alphanum()
      .length(24),
  }),
}), usersController.getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim()
      .min(2)
      .max(30)
      .default(defaults.name),
    about: Joi.string().trim()
      .min(2)
      .max(30)
      .default(defaults.about),
  }),
}), usersController.updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim()
      .uri()
      .default(defaults.avatar),
  }),
}), usersController.setAvatar);

module.exports = router;
