const { DataTypes } = require('sequelize');
const sequelize = require('../conn/dbconnection'); 

const Vehicle = sequelize.define('Vehicle', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CarId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { 
      model: 'CarTypes',
      key: 'id',
    },
  },
  BikeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Bikes',
      key: 'id',
    },
  }
});

module.exports = Vehicle;
