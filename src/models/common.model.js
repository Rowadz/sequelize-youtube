const { INTEGER } = require('sequelize');
const commonModel = {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
};

const commonOptions = {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
};

module.exports = { commonModel, commonOptions };
