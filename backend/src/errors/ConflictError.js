const HttpError = require('./HttpError');
const errors = require('../utils/messages');

class ConflictError extends HttpError {
  constructor(message) {
    super(message, 409);
  }

  static fromEntriesString(format, entries, fallback = errors.http.conflict.message) {
    return new ConflictError(format && entries
      ? format(entries)
      : fallback);
  }
}

module.exports = ConflictError;
