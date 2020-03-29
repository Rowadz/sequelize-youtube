const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { STRING, TEXT } = DataTypes;
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
  return Posts;
};
