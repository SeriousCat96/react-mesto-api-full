module.exports = (req, res, next) => {
  req.user = {
    _id: '60611d4a171c1512c482f32f',
  };

  next();
};
