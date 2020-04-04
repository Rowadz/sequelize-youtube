const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function (sequelize, DataTypes) {
  class UsersFollowers extends Model {}

  UsersFollowers.init(commonModel, {
    ...commonOptions,
    modelName: 'users_followers',
    sequelize,
  });

  UsersFollowers.beforeSync(() =>
    console.log('before creaing the UsersFollowers table')
  );
  UsersFollowers.afterSync(() =>
    console.log('before creaing the UsersFollowers table')
  );
  return UsersFollowers;
};
