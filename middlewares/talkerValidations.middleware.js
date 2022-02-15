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
  if (typeof rate !== 'number' || rate <= 0 || rate > 5) return next('talkRateInvalid');
};

const talkValidation = (talk, next) => {
  if (!talk) return next('talkEmpty');
  const { watchedAt, rate } = talk;

  if (!watchedAt || !rate) return next('talkEmpty');
  watchedAtValidation(watchedAt, next);
  rateValidation(rate, next);
};

const talkerValidationPost = (req, _res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;

  tokenValidation(authorization, next);
  nameValidation(name, next);
  ageValidation(age, next);
  talkValidation(talk, next);
  return next();
};

module.exports = {
  talkerValidationPost,
};