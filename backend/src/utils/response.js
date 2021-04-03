const getValidationMessage = (err) => (err.errors
  ? Object.values(err.errors).join('; ')
  : 'Введены некорректные данные');

const processError = (err, req, res, next) => {
  switch (err.name) {
    case 'CastError':
      if (err.path === '_id') {
        return next({ statusCode: 400, message: 'Введен невалидный _id' });
      }
      return next(err);

    case 'ValidationError':
      return next({ statusCode: 400, message: getValidationMessage(err) });

    default:
      return next(err);
  }
};

const ensureExists = (value, message, res, next) => {
  if (!value) {
    return next({ statusCode: 404, message });
  }

  return res.json(value);
};

module.exports = {
  getValidationMessage,
  processError,
  ensureExists,
};
