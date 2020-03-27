const { sequelize } = require('./con');
const usersModel = require('./models/users.model');

sequelize
  .authenticate()
  .then(async result => {
    try {
      console.log(result);
      await usersModel(sequelize);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(err => {
    console.error(err);
  });
