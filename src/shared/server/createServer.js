const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const startApp = require('../app');
const { logger } = require('../utils');

const { NODE_ENV } = process.env;
const serviceName = process.argv[2];
const app = startApp(serviceName);
const port = process.env[`${serviceName.toUpperCase()}_PORT`];

module.exports = async () => {
  const server = http.createServer(app);

  createTerminus(server, {
    signals: ['SIGINT', 'SIGTERM'],
    healthChecks: {
      '/healthcheck': () => null,
    },
    onSignal: async () => {
      logger.info('Stopping server!');
      logger.info(
        'Start cleanup of resource, like databases or file descriptors',
      );
    },
  });

  server.listen(port, () => {
    logger.info(`${serviceName} service (${NODE_ENV}) started on ${port}`);
  });
};
