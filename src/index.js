const { sequelize } = require('./con');
const Users = sequelize.import(__dirname + '/models/users.model.js');
const Posts = sequelize.import(__dirname + '/models/posts.model.js');
const Types = sequelize.import(__dirname + '/models/types.model.js');
const UsersTypes = sequelize.import(__dirname + '/models/users_types.model.js');
const UsersFollowers = sequelize.import(
  __dirname + '/models/users_followers.model.js'
);

const { writeFileSync } = require('fs');

sequelize
  .authenticate()
  .then(async () => {
    defineRelations();
    // await Users.sync({ force: true });
    // await Posts.sync({ force: true });
    // await Types.sync({ force: true });
    // await UsersTypes.sync({ force: true });
    await sequelize.sync({ force: false });
    const res = await Users.findAll({
      include: ['supervisor', 'employees', 'followers', 'following'],
      logging: console.log,
    });
    writeFileSync(
      'users.json',
      JSON.stringify(
        res.map((el) => el.get({ plain: true })),
        null,
        2
      )
    );
  })
  .catch((err) => {
    console.error(err);
  });

const defineRelations = () => {
  const common = (options) => ({
    ...options,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Users.hasMany(Posts, common({ foreignKey: 'user_id' }));

  Users.hasMany(Users, { foreignKey: 'supervisor_id', as: 'employees' });
  Users.belongsTo(Users, { foreignKey: 'supervisor_id', as: 'supervisor' });

  Users.belongsToMany(
    Users,
    common({
      through: 'users_followers',
      foreignKey: 'follower_id',
      otherKey: 'following_id',
      as: 'followers',
    })
  );

  Users.belongsToMany(
    Users,
    common({
      through: 'users_followers',
      foreignKey: 'following_id',
      otherKey: 'follower_id',
      as: 'following',
    })
  );

  Users.belongsToMany(
    Types,
    common({
      through: 'users_types',
      foreignKey: 'user_id',
      otherKey: 'type_id',
    })
  );

  Types.belongsToMany(
    Users,
    common({
      through: 'users_types',
      foreignKey: 'type_id',
      otherKey: 'user_id',
    })
  );

  UsersTypes.belongsTo(Types, { foreignKey: 'type_id' });
  UsersTypes.belongsTo(Users, { foreignKey: 'user_id' });
  Users.hasMany(UsersTypes, common({ foreignKey: 'user_id' }));
  Types.hasMany(UsersTypes, common({ foreignKey: 'type_id' }));
};
