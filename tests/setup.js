const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.test'),
});

const startApp = require('../src/shared/app');

global.chai = chai;
global.expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiLike);

const serviceName = process.argv[4];
const app = startApp(serviceName.replace('--', ''));
global.app = app;
