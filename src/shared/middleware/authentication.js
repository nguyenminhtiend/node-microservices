const jwt = require('jsonwebtoken');
const { AppError } = require('../utils');

const BEARER_TOKEN = /^Bearer (.*)$/;
const { PUBLIC_KEY } = process.env;

const authenticate = (token) => {
  if (!token) throw new AppError('Missing token', 401);
  let decoded;
  try {
    decoded = jwt.verify(token, PUBLIC_KEY.replace(/\\n/gm, '\n'), {
      algorithm: 'RS256',
    });
  } catch (err) {
    throw new AppError(err.message, 401);
  }
  return decoded;
};

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw new AppError('Authorization header is missing', 401);

  const regexResult = BEARER_TOKEN.exec(authHeader);
  if (!regexResult) throw new AppError('Authorization header format is invalid', 401);

  const accessToken = regexResult[1];
  const decoded = authenticate(accessToken);
  req.decoded = decoded;

  next();
};
