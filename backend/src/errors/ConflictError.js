const HttpError = require('./HttpError');

class ConflictError extends HttpError {
  constructor(message) {
    super(message, 409);
  }
}

module.exports = ConflictError;
