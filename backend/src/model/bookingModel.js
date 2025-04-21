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
});

module.exports = Booking;