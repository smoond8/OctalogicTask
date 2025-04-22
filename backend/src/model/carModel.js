  const { DataTypes } = require('sequelize');
  const sequelize = require('../conn/dbconnection'); 

  const CarType = sequelize.define('CarType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  module.exports = CarType;
