const crypto = require('crypto');

const talkerValidationPost = (req, _res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const MIN_CHAR = 3;

  if (authorization.length !== 16) return next('tokenInvalid');
  if (!name) return next('nameEmpty');
  if (name.length <= MIN_CHAR) return next('nameInvalid');
  return next();
};

module.exports = {
  talkerValidationPost,
};