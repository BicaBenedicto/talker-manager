const express = require('express');
const fs = require('fs');
const { personNotFound } = require('../errors/index.errors');
const { talkerValidationPost } = require('../middlewares/talkerValidations.middleware');

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

talkerRouter.post('/', talkerValidationPost, (req, res, _next) => {
  const newPerson = req.body;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const id = talker.sort((a, b) => b.id - a.id)[0].id + 1;

  talker.push({ id, ...newPerson });

  fs.writeFileSync('./talker.json', JSON.stringify(talker));
  return res.status(201).json({ id, ...newPerson });
});

module.exports = talkerRouter;
