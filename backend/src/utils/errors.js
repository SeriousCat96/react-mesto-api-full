const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const HttpError = require('../errors/HttpError');

const MONGO_ERROR_CONFLICT = 11000;

function getValidationMessage(err) {
  return err.errors
    ? Object.values(err.errors).join('; ')
    : 'Введены некорректные данные';
}

module.exports.getError = (err, message) => {
  if (err instanceof HttpError) return err;
  if (err.code === MONGO_ERROR_CONFLICT) return new ConflictError(message || err);

  switch (err.name) {
    case 'CastError':
      if (err.path === '_id') return new BadRequestError('Введен невалидный _id');
      return new BadRequestError(message || err);

    case 'ValidationError':
      return new BadRequestError(getValidationMessage(err));

    default:
      return new Error(message);
  }
};
