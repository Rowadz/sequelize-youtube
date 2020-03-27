const { Model, ENUM, STRING, TEXT } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');
class Users extends Model {}

module.exports = sequelize => {
  Users.init(
    {
      ...commonModel,
      firstName: {
        type: STRING({ length: 256 }),
        allowNull: false,
        unique: true,
        field: 'first_name'
      },
      about: {
        type: TEXT,
        allowNull: true
      },
      email: {
        type: STRING({ length: 256 }),
        unique: true,
        allowNull: false
      },
      role: {
        type: ENUM(['user', 'admin']),
        defaultValue: 'user'
      }
      // password: {
      // set(){
      //     return hash_me;
      // }
      // }
    },
    { ...commonOptions, modelName: 'users', sequelize }
  );

  return Users.sync()
    .then(() => console.log('Created Users Table'))
    .catch(console.error);
};
