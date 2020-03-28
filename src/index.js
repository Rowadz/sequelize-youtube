const { sequelize } = require('./con');
const users = require('./models/users.model');
const posts = require('./models/posts.model');

sequelize
  .authenticate()
  .then(async () => {
    await users.sync({ force: true });
    await posts.sync({ force: true });
  })
  .catch(err => {
    console.error(err);
  });
