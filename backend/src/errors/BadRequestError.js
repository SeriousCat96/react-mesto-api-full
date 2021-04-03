const HttpError = require('./HttpError');

class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
