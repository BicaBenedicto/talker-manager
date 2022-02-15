const crypto = require('crypto');

const nameValidation = (name, next) => {
  const MIN_CHAR = 3;

  if (!name) return next('nameEmpty');
  if (name.length <= MIN_CHAR) return next('nameInvalid');
  return false;
};

const ageValidation = (age, next) => {
  const MIN_AGE = 18;

  if (!age) return next('ageEmpty');
  if (age < MIN_AGE) return next('ageInvalid');
  return false;
};

const tokenValidation = (authorization, next) => {
  if (authorization.length !== 16) return next('tokenInvalid');
  return false;
};

const talkerValidationPost = (req, _res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;

  tokenValidation(authorization, next);
  nameValidation(name, next);
  ageValidation(age, next);
  return next();
};

module.exports = {
  talkerValidationPost,
};