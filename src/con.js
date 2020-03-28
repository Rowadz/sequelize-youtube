const Sequelize = require('sequelize');
require('dotenv').config();

const init = () => {
  const { DB_HOST, DB_USER, DB_DB, DB_PASS } = process.env;
  const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres'
    // logging: false
  });
  // Sequelize will keep the connection open by default, and use the same connection for all queries.
  // If you need to close the connection, call sequelize.close() (which is asynchronous and returns a Promise).

  return sequelize;
};

module.exports = { sequelize: init() };
