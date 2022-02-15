const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const emailAndPasswordValidation = (req, _res, next) => {
  const { email, password } = req.body;
  const MIN_PASSWORD = 6;

  if (!email) return next('emailEmpty');
  if (!emailRegexp.test(email)) return next('emailInvalid');
  if (!password) return next('passwordEmpty');
  if (password.length <= MIN_PASSWORD) return next('passwordInvalid');
  return next();
};

module.exports = {
  emailAndPasswordValidation,
};