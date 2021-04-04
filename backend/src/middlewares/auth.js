const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const error = require('../utils/messages');
const { devSecret } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthorizedError(error.http.unauthorized.message);

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
