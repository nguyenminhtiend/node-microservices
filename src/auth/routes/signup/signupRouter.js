const express = require('express');
const { asyncRoute, validator } = require('../../../shared/utils');
const signupController = require('./signupController');
const signupSchema = require('./signupSchema');

module.exports = (app) => {
  const router = express.Router();

  router.post(
    '/password',
    validator(signupSchema.password),
    asyncRoute(signupController.password),
  );

  router.get('/password', (req, res) => {
    res.send('Hello world password');
  });

  app.use('/signup', router);
};
