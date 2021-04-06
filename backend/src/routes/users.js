const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);

router.get('/me', usersController.getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().trim()
      .hex()
      .length(24),
  }),
}), usersController.getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim()
      .required()
      .min(2)
      .max(30),
    about: Joi.string().trim()
      .required()
      .min(2)
      .max(30),
  }),
}), usersController.updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim()
      .required()
      .uri(),
  }),
}), usersController.setAvatar);

module.exports = router;
