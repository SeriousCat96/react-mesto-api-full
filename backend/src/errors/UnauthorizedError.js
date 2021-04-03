const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
