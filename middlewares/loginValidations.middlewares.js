const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const emailValidation = (req, _res, next) => {
  const { email } = req.body;
  if (!email) return next('emailEmpty');
  if (!emailRegexp.test(email)) return next('emailInvalid');
  return next();
};

module.exports = {
  emailValidation,
};