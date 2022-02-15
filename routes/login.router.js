const express = require('express');
const crypto = require('crypto');
const { emailAndPasswordValidation } = require('../middlewares/loginValidations.middlewares');

const loginRouter = express.Router();

loginRouter.post('/', emailAndPasswordValidation, (req, res, _next) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

module.exports = loginRouter;
