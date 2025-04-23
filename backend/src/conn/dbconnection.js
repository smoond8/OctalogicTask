const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('carrental', 'postgres', '123', {
//   host: 'localhost',
//   dialect: 'postgres',
//   define: {
//     timestamps: false, 
//   }, 
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('DataBase connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
