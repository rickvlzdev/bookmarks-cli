const path = require('path');
module.exports = {
  database: {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false,
    pool: {
      evict: 1,
      idle: 1,
    },
  },
};
