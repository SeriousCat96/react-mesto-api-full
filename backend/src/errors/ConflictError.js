const HttpError = require('./HttpError');

class ConflictError extends HttpError {
  constructor(entries, message) {
    super(message, 409);
    this.entries = entries;
  }
}

module.exports = ConflictError;
