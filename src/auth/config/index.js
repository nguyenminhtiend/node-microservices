const { NODE_ENV } = process.env;
if (['development', 'test'].includes(NODE_ENV)) {
  require("dotenv").config(); //eslint-disable-line
}

const {
  AUTH_DB_HOST,
  AUTH_DB_USERNAME,
  AUTH_DB_PASSWORD,
  AUTH_DB_DATABASE,
  AUTH_DB_PORT,
  AUTH_DB_LOGGING,
} = process.env;

const db = {
  host: AUTH_DB_HOST,
  username: AUTH_DB_USERNAME,
  password: AUTH_DB_PASSWORD,
  database: AUTH_DB_DATABASE,
  port: AUTH_DB_PORT,
  dialect: 'mysql',
};

if (!AUTH_DB_LOGGING) {
  db.logging = false;
}

module.exports = {
  [NODE_ENV]: db,
};
