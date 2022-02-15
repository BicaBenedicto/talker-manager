const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const loginRouter = express.Router();

loginRouter.post('/', (_req, res, _next) => {
  const token = crypto.randomBytes(8).toString('hex');
  const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  return res.status(200).json({ token });
});

module.exports = loginRouter;
