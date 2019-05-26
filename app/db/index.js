const Sequelize = require('sequelize');
const {
  database: config,
} = require('../../config');
const models = require('./models')(new Sequelize(config), Sequelize);

module.exports = {
  Op: Sequelize.Op,
  ...models,
};
