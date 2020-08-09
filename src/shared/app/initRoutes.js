const path = require('path');
const glob = require('glob');
const express = require('express');

module.exports = (app, serviceName) => {
  const files = glob.sync(`./src/${serviceName}/routes/**/**Router.js`);
  const router = express.Router();

  files.forEach((filePath) => {
    const fullPath = path.join(process.cwd(), filePath);
    const relativePath = `./${path.relative(__dirname, fullPath)}`;
    require(relativePath)(router); //eslint-disable-line
  });
  app.use(`/${serviceName}`, router);

  app.get('/', (req, res) => {
    res.send(`${serviceName} service is ready!`);
  });
};
