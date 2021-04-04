const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const HttpError = require('../errors/HttpError');
const errors = require('./messages');

const MONGO_ERROR_CONFLICT = 11000;

module.exports.getError = (err) => {
  if (err instanceof HttpError) return err;

  switch (err.name) {
    case 'CastError':
      if (err.path === '_id') return new BadRequestError(errors.http.badRequest.params._id);
      return new BadRequestError(err);

    case 'ValidationError':
      return BadRequestError.fromValidationError(err);

    case 'MongoError':
      if (err.code === MONGO_ERROR_CONFLICT) {
        return ConflictError.fromEntriesString(errors.http.conflict.format, err.keyValue);
      }
      return new Error();

    default:
      return new Error();
  }
};
