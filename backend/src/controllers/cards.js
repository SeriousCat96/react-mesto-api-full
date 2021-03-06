const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { getError } = require('../utils/errors');
const errors = require('../utils/messages');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.populate(card, ['likes', 'owner']))
    .then((card) => res.json(card))
    .catch((err) => {
      throw getError(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) throw new NotFoundError(errors.http.notFound.format('Карточки'));
    if (card.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(errors.http.forbidden.card);
    }

    return Card
      .findByIdAndDelete(req.params.cardId)
      .populate(['likes', 'owner']);
  })
  .then((card) => res.json(card))
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.getCards = (req, res, next) => Card.find({})
  .populate(['likes', 'owner'])
  .then((cards) => res.json(cards))
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .populate(['likes', 'owner'])
  .then((card) => {
    if (!card) throw new NotFoundError(errors.http.notFound.format('Карточки'));
    return res.json(card);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .populate(['likes', 'owner'])
  .then((card) => {
    if (!card) throw new NotFoundError(errors.http.notFound.format('Карточки'));
    return res.json(card);
  })
  .catch((err) => {
    throw getError(err);
  })
  .catch(next);
