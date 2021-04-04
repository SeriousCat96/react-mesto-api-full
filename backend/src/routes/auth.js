const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim()
      .required()
      .min(3)
      .max(320),
    password: Joi.string()
      .required()
      .min(6),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim()
      .required()
      .min(3)
      .max(320),
    password: Joi.string()
      .required()
      .min(6),
    name: Joi.string().trim()
      .min(2)
      .max(30),
    about: Joi.string().trim()
      .min(2)
      .max(30),
    avatar: Joi.string().trim().uri(),
  }),
}), createUser);

module.exports = router;
