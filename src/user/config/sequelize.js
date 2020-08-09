const path = require('path');

module.exports = {
  config: path.resolve('src', 'user', 'config', 'index.js'),
  'migrations-path': path.resolve('src', 'user', 'migrations'),
  'models-path': path.resolve('src', 'user', 'models'),
};
