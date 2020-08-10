const express = require('express');
const { asyncRoute, validator } = require('../../../shared/utils');
const authentication = require('../../../shared/middleware/authentication');
const employeeController = require('./employeeController');
const employeeSchema = require('./employeeSchema');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', asyncRoute(employeeController.index));
  router.get('/:id', asyncRoute(employeeController.show));
  router.post(
    '/',
    authentication,
    validator(employeeSchema.create),
    asyncRoute(employeeController.create),
  );
  router.put('/:id', asyncRoute(employeeController.update));

  app.use('/employees', router);
};
