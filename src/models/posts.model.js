const { Model, STRING, TEXT } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');
const { sequelize } = require('../con');

class Posts extends Model {}

Posts.init(
  {
    ...commonModel,
    title: {
      type: STRING({ length: 256 }),
      allowNull: false,
      unique: true
    },
    body: {
      type: TEXT,
      allowNull: false
    }
  },
  { ...commonOptions, modelName: 'posts', sequelize }
);

Posts.beforeSync(() => console.log('before creaing the post table'));
Posts.afterSync(() => console.log('before creaing the post table'));

module.exports = Posts;
