if (process.env.NODE_ENV === 'development') {
  require("dotenv").config(); //eslint-disable-line
}

const createServer = require('./createServer');

createServer();
