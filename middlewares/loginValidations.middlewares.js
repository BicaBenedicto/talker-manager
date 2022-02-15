const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const emailAndPasswordValidation = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email) return next('emailEmpty');
  if (!emailRegexp.test(email)) return next('emailInvalid');
  if (!password) return next('passwordEmpty');

  return next();
};

module.exports = {
  emailAndPasswordValidation,
};