const express = require('express');
const crypto = require('crypto');
const { emailAndPasswordValidation } = require('../middlewares/loginValidations.middlewares');

const loginRouter = express.Router();

const tokens = [];

loginRouter.post('/', emailAndPasswordValidation, (req, res, _next) => {
  const token = crypto.randomBytes(8).toString('hex');
  tokens.push(token);
  return res.status(200).json({ token });
});
module.exports = {
  loginRouter,
  tokens,
};
