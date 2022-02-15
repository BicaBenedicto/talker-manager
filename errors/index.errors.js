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
  tokenNotFound: {
    status: 401,
    message: 'Token não encontrado',
  },
  tokenInvalid: {
    status: 401,
    message: 'Token inválido',
  },
  nameEmpty: {
    status: 400,
    message: 'O campo "name" é obrigatório',
  },
  nameInvalid: {
    status: 400,
    message: 'O "name" deve ter pelo menos 3 caracteres',
  },
  ageEmpty: {
    status: 400,
    message: 'O campo "age" é obrigatório',
  },
  ageInvalid: {
    status: 400,
    message: 'A pessoa palestrante deve ser maior de idade',
  },
  talkEmpty: {
    status: 400,
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  },
  talkDateInvalid: {
    status: 400,
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  },
  talkRateInvalid: {
    status: 400,
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  },
};

const errorHanddlerMiddleware = (error, _req, res, _next) => {
  console.log(error);
  const { status, message } = ERRORS[error];
  if (error === 'passwordEmpty') return res.status(status).json(message);
  return res.status(status).json({ message });
};

module.exports = {
  personNotFound,
  errorHanddlerMiddleware,
};