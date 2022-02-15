const personNotFound = (_req, res, _next) => res.status(404)
  .json({ message: 'Pessoa palestrante não encontrada' });

module.exports = {
  personNotFound,
};