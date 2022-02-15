const nameValidation = (req, _res, next) => {
  const { name } = req.body;
  const MIN_CHAR = 3;

  if (!name) return next('nameEmpty');
  if (name.length <= MIN_CHAR) return next('nameInvalid');
  return false;
};

const ageValidation = (req, _res, next) => {
  const { age } = req.body;
  const MIN_AGE = 18;

  if (!age) return next('ageEmpty');
  if (age < MIN_AGE) return next('ageInvalid');
  return false;
};

const tokenValidation = (req, _res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) return next('tokenNotFound');
  if (authorization.length !== 16) return next('tokenInvalid');
  if (req.useNext) return false;
  return next();
};

const dateValidation = (date) => {
  const dayValidation = Number(date.split('/')[0]) >= 32;
  const monthValidation = Number(date.split('/')[1]) >= 13;
  const yearValidation = date.split('/')[2].length !== 4;

  return dayValidation || monthValidation || yearValidation;
};

const watchedAtValidation = (watchedAt, next) => {
  if (watchedAt[2] !== '/' && watchedAt[5] !== '/') return next('talkDateInvalid');

  if (dateValidation(watchedAt)) return next('talkDateInvalid');
  return false;
};

const rateValidation = (rate, next) => {
  if (typeof rate !== 'number' || rate < 1 || rate > 5) return next('talkRateInvalid');
  return false;
};

const talkValidation = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk) return next('talkEmpty');
  const { watchedAt, rate } = talk;
  if (!watchedAt || typeof rate !== 'number') return next('talkEmpty');

  rateValidation(rate, next);
  watchedAtValidation(watchedAt, next);
  return false;
};

const talkerValidationPost = (req, res, next) => {
  req.useNext = true;
  tokenValidation(req, res, next);
  nameValidation(req, res, next);
  ageValidation(req, res, next);
  talkValidation(req, res, next);
  return next();
};

module.exports = {
  talkerValidationPost,
  tokenValidation,
};
