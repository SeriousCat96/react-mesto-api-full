module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка сервера';

  res.status(statusCode).json({ message });

  return next();
};
