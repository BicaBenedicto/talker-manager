const express = require('express');
const fs = require('fs');
const { personNotFound } = require('../errors/index.errors');

const talkerRouter = express.Router();

talkerRouter.get('/', (_req, res, _next) => {
  const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  return res.status(200).json(talker);
});

talkerRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const findTalkerID = talker.find((person) => person.id === Number(id));

  if (findTalkerID) return res.status(200).json(findTalkerID);
  next();
}, personNotFound);

module.exports = talkerRouter;
