const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  class UsersTypes extends Model {}

  UsersTypes.init(commonModel, {
    ...commonOptions,
    modelName: 'users_types',
    sequelize
  });

  UsersTypes.beforeSync(() =>
    console.log('before creaing the UsersTypes table')
  );
  UsersTypes.afterSync(() =>
    console.log('before creaing the UsersTypes table')
  );
  return UsersTypes;
};
