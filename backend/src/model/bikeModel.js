const { DataTypes } = require('sequelize');
const sequelize = require('../conn/dbconnection'); 

const Bike = sequelize.define('Bike', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
});

module.exports = Bike;
