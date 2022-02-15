const express = require('express');
const fs = require('fs');

const talkerRouter = express.Router();

talkerRouter.get('/', (_req, res, _next) => {
  const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  return res.status(200).json(talker);
});

module.exports = talkerRouter;
