const express = require('express');
const fs = require('fs');
const { personNotFound } = require('../errors/index.errors');
const { talkerValidationPost,
  tokenValidation } = require('../middlewares/talkerValidations.middleware');

const talkerRouter = express.Router();
const TALKER = 'talker.json';

talkerRouter.get('/search', tokenValidation, (req, res, _next) => {
  const { q } = req.query;
  const talker = JSON.parse(fs.readFileSync(TALKER, 'utf8'));
  const findTalkerID = talker.filter((person) => person.name.includes(q));

  return res.status(200).json(findTalkerID);
});

talkerRouter.put('/:id', talkerValidationPost, (req, res, _next) => {
  const { id } = req.params;
  const person = req.body;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'))
    .map((talk) => (talk.id === Number(id) ? { id: Number(id), ...person } : talk));

  fs.writeFileSync(TALKER, JSON.stringify(talkers));
  return res.status(200).json({ id: Number(id), ...person });
});

talkerRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const findTalkerID = talker.find((person) => person.id === Number(id));

  if (findTalkerID) return res.status(200).json(findTalkerID);
  next();
}, personNotFound);

talkerRouter.delete('/:id', tokenValidation, (req, res, _next) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync(TALKER, 'utf8'))
    .filter((talk) => talk.id !== Number(id));

  fs.writeFileSync(TALKER, JSON.stringify(talker));
  return res.sendStatus(204);
});

talkerRouter.post('/', talkerValidationPost, (req, res, _next) => {
  const newPerson = req.body;
  const talker = JSON.parse(fs.readFileSync(TALKER, 'utf8'));
  const id = talker.sort((a, b) => b.id - a.id)[0].id + 1;

  talker.push({ id, ...newPerson });

  fs.writeFileSync(TALKER, JSON.stringify(talker));
  return res.status(201).json({ id, ...newPerson });
});

talkerRouter.get('/', (_req, res, _next) => {
  const talker = JSON.parse(fs.readFileSync(TALKER, 'utf8'));
  return res.status(200).json(talker);
});

module.exports = talkerRouter;
