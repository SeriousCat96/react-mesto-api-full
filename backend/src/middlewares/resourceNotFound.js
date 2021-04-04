const NotFoundError = require('../errors/NotFoundError');
const errors = require('../utils/messages');

module.exports = () => {
  throw new NotFoundError(errors.http.notFound.message);
};
