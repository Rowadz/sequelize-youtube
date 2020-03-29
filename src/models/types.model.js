const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { ENUM, STRING, TEXT } = DataTypes;
  class Types extends Model {}

  Types.init(
    {
      ...commonModel,
      type: {
        type: ENUM(['type 1', 'type 2', 'type 3', 'type 4', 'type 5']),
        allowNull: false,
        defaultValue: 'type 1'
      }
    },
    { ...commonOptions, modelName: 'types', sequelize }
  );

  Types.beforeSync(() => console.log('before creaing the type table'));
  Types.afterSync(() => console.log('before creaing the type table'));

  return Types;
};
