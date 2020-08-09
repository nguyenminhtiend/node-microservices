const jwt = require('jsonwebtoken');

const { PRIVATE_KEY } = process.env;

module.exports = (data) => jwt.sign(data, PRIVATE_KEY.replace(/\\n/gm, '\n'), {
  algorithm: 'RS256',
});
