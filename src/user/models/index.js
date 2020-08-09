const create = require('../../shared/database');

const { NODE_ENV } = process.env;
const config = require('../config');

module.exports = create(__dirname, config[NODE_ENV]);
