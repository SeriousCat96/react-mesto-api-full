const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, logout, createUser } = require('../controllers/auth');

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

router.get('/signout', logout);

module.exports = router;
