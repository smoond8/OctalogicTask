const CarType = require('./carModel');
const Vehicle = require('./vehicleModel');
const Booking = require('./bookingModel');
const BikeType = require('./bikeModel');

// Define associations
CarType.hasMany(Vehicle);
BikeType.hasMany(Vehicle);
Vehicle.belongsTo(CarType);

Vehicle.hasMany(Booking);
Booking.belongsTo(Vehicle);

module.exports = {
  CarType,
  Vehicle,
  Booking,
  BikeType
};
