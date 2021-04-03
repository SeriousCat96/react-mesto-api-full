const Card = require('../models/card');
const responseHandler = require('../utils/response');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.populate(card, ['likes', 'owner']))
    .then((card) => res.json(card))
    .catch((err) => responseHandler.processError(err, req, res, next));
};

module.exports.deleteCard = (req, res, next) => Card.findByIdAndRemove(req.params.cardId)
  .populate(['likes', 'owner'])
  .then((card) => responseHandler.ensureExists(card, `Карточки с id=${req.params.cardId} не существует`, res, next))
  .catch((err) => responseHandler.processError(err, req, res, next));

module.exports.getCards = (req, res, next) => Card.find({})
  .populate(['likes', 'owner'])
  .then((cards) => res.json(cards))
  .catch((err) => responseHandler.processError(err, req, res, next));

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .populate(['likes', 'owner'])
  .then((card) => responseHandler.ensureExists(card, `Карточки с id=${req.params.cardId} не существует`, res, next))
  .catch((err) => responseHandler.processError(err, req, res, next));

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  {
    new: true,
    runValidators: true,
  },
)
  .populate(['likes', 'owner'])
  .then((card) => responseHandler.ensureExists(card, `Карточки с id=${req.params.cardId} не существует`, res, next))
  .catch((err) => responseHandler.processError(err, req, res, next));
