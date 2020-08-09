const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logRequest = require('./logRequest');
const initRoutes = require('./initRoutes');
const logResponse = require('./logResponse');
const errorHandler = require('./errorHandler');

module.exports = (serviceName) => {
  const app = express();
  app.set('serviceName', serviceName.toUpperCase());
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  logRequest(app);
  initRoutes(app, serviceName.toLowerCase());
  app.use(errorHandler);
  logResponse(app);

  return app;
};
