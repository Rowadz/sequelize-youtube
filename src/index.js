const { sequelize } = require('./con');
const Users = sequelize.import(__dirname + '/models/users.model.js');
const Posts = sequelize.import(__dirname + '/models/posts.model.js');
const Types = sequelize.import(__dirname + '/models/types.model.js');
const UsersTypes = sequelize.import(__dirname + '/models/users_types.model.js');

sequelize
  .authenticate()
  .then(async () => {
    defineRelations();
    // await Users.sync({ force: true });
    // await Posts.sync({ force: true });
    // await Types.sync({ force: true });
    // await UsersTypes.sync({ force: true });
    sequelize.sync({ force: true });
  })
  .catch(err => {
    console.error(err);
  });

const defineRelations = () => {
  const common = options => ({
    ...options,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Users.hasMany(Posts, common({ foreignKey: 'user_id' }));
  Users.belongsToMany(Types, {
    through: 'users_types',
    foreignKey: 'user_id',
    otherKey: 'type_id'
  });
  Types.belongsToMany(Users, {
    through: 'users_types',
    foreignKey: 'type_id',
    otherKey: 'user_id'
  });
  UsersTypes.belongsTo(Types, common({ foreignKey: 'type_id' }));
  UsersTypes.belongsTo(Users, common({ foreignKey: 'user_id' }));
  Users.hasMany(UsersTypes, common({ foreignKey: 'user_id' }));
  Types.hasMany(UsersTypes, common({ foreignKey: 'type_id' }));
};
