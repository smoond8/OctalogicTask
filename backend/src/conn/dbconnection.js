const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('carrental', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false, 
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DataBase connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
