const { Model, ENUM, STRING, TEXT } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');
const { sequelize } = require('../con');
const posts = require('./posts.model');

class Users extends Model {}
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
  },
  { ...commonOptions, modelName: 'users', sequelize }
);

Users.beforeSync(() => console.log('before creaing the user table'));
Users.afterSync(() => console.log('before creaing the user table'));

Users.hasMany(posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Users;
