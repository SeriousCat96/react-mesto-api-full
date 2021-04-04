const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsController = require('../controllers/cards');

router.get('/', cardsController.getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim()
      .required()
      .min(2)
      .max(30),
    link: Joi.string().trim()
      .uri()
      .required(),
  }),
}), cardsController.createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().trim()
      .alphanum()
      .length(24),
  }),
}), cardsController.likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().trim()
      .alphanum()
      .length(24),
  }),
}), cardsController.dislikeCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().trim()
      .alphanum()
      .length(24),
  }),
}), cardsController.deleteCard);

module.exports = router;
