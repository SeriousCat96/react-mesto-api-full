const HttpError = require('./HttpError');
const errors = require('../utils/messages');

class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400);
  }

  static fromValidationError(err, fallback = errors.http.badRequest.message) {
    return new BadRequestError(err.errors
      ? Object.values(err.errors).join('; ')
      : fallback);
  }
}

module.exports = BadRequestError;
