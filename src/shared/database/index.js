const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (dirname, config) => {
  const sequelize = new Sequelize(config);
  const paths = fs.readdirSync(dirname);
  const models = {};

  paths
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
      const model = require(path.join(dirname, file)); //eslint-disable-line
      models[model.name] = model.init(model._attributes, {
        sequelize,
        ...model._options,
      });
    });

  Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

  return {
    sequelize,
    Sequelize,
    ...models,
  };
};
