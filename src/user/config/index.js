const path = require('path');

const { NODE_ENV } = process.env;
if (['development', 'test'].includes(NODE_ENV)) {
  const envPath = {
    test: '.env.test',
    development: '.env',
  };
  require('dotenv').config({
    path: path.resolve(process.cwd(), envPath[NODE_ENV]),
  }); //eslint-disable-line
}

const {
  USER_DB_HOST,
  USER_DB_USERNAME,
  USER_DB_PASSWORD,
  USER_DB_DATABASE,
  USER_DB_PORT,
  USER_DB_LOGGING,
} = process.env;

const db = {
  host: USER_DB_HOST,
  username: USER_DB_USERNAME,
  password: USER_DB_PASSWORD,
  database: USER_DB_DATABASE,
  port: USER_DB_PORT,
  dialect: 'mysql',
};

if (!USER_DB_LOGGING) {
  db.logging = false;
}

module.exports = {
  [NODE_ENV]: db,
};
