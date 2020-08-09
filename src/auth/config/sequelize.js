const path = require('path');

module.exports = {
  config: path.resolve('src', 'auth', 'config', 'index.js'),
  'migrations-path': path.resolve('src', 'auth', 'migrations'),
  'models-path': path.resolve('src', 'auth', 'models'),
};
