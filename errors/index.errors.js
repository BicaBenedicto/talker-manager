const personNotFound = (_req, res, _next) => res.status(404)
  .json({ message: 'Pessoa palestrante não encontrada' });

const ERRORS = {
  emailEmpty: {
    status: 400,
    message: 'O campo "email" é obrigatório',
  },
  emailInvalid: {
    status: 400,
    message: 'O "email" deve ter o formato "email@email.com"',
  },
  passwordEmpty: {
    status: 400,
    message: {
      message: 'O campo "password" é obrigatório',
    },
  },
  passwordInvalid: {
    status: 400,
    message: 'O "password" deve ter pelo menos 6 caracteres',
  },
};

const errorHanddlerMiddleware = (error, _req, res, _next) => {
  const { status, message } = ERRORS[error];
  return res.status(status).json({ message });
};

module.exports = {
  personNotFound,
  errorHanddlerMiddleware,
};