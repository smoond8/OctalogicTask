const { DataTypes } = require('sequelize');
const sequelize = require('../conn/dbconnection'); 

const Booking = sequelize.define('Booking', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  firstName:{
    type:DataTypes.STRING
  },
  lastName:{
    type:DataTypes.STRING
  }
});

module.exports = Booking;