const emailValidation = (req, _res, next) => {
  const { email } = req.body;
  if (!email) return next('emailEmpty');
  return next();
};

module.exports = {
  emailValidation,
};