const errors = require('../utils/messages');

module.exports = (req, res) => res
  .status(404)
  .json({ message: errors.http.notFound.message });
