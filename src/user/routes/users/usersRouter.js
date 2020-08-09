const express = require('express');
const { asyncRoute, validator } = require('../../../shared/utils');
const UsersController = require('./usersController');
const usersSchema = require('./usersSchema');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', asyncRoute(UsersController.getUsers));
  router.post(
    '/',
    validator(usersSchema.createUser),
    asyncRoute(UsersController.createUser),
  );
  app.use('/users', router);
};
