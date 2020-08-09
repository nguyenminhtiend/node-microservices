module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
    next();
  } catch (err) {
    next(err);
  }
};
