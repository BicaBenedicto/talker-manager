const crypto = require('crypto');

const talkerValidationPost = (req, _res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const MIN_CHAR = 3;
  const MIN_AGE = 18;

  if (authorization.length !== 16) return next('tokenInvalid');
  if (!name) return next('nameEmpty');
  if (name.length <= MIN_CHAR) return next('nameInvalid');
  if (!age) return next('ageEmpty');
  if (age < MIN_AGE) return next('ageInvalid');
  return next();
};

module.exports = {
  talkerValidationPost,
};