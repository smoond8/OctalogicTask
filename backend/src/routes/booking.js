const express = require('express');
const router = express.Router();
const { Vehicle, Booking,BikeType,CarType } = require('../model');
const { Op } = require('sequelize');
const validate = require('../vaidation/index');
const bookingVal=require('../vaidation/bookingVal')

router.get('/vehicle-types', validate(bookingVal.VehicleTypeVal),async (req, res) => {
  try {
    const { noOfWheels } = req.query;
    let data, label;

    if (parseInt(noOfWheels) === 2) {
      data = await BikeType.findAll();
      label = 'bike';
    } else if (parseInt(noOfWheels) === 4) {
      data = await CarType.findAll();
      label = 'car';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid wheel count',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${label} types fetched successfully.`,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
});


router.get('/vehicles',validate(bookingVal.VehicleVal), async (req, res) => {
  try {
    const { type, typeId } = req.query;

    let vehicles;

    if (type === 'bike') {
      vehicles = await Vehicle.findAll({ where: { BikeId: typeId } });
    } else if (type === 'car') {
      vehicles = await Vehicle.findAll({ where: { CarId: typeId } });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle type',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Vehicles fetched successfully.',
      data: vehicles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
});


router.get('/available-vehicles', validate(bookingVal.avlVehicleVal),async (req, res) => {
    try {
  
      const {date}=req.query
      const rentedVehicleIds = await getRentedVehicleIds(date);
  
      const availableVehicles = await Vehicle.findAll({
        where: {
          id: {
            [Op.notIn]: rentedVehicleIds,
          },
        },
      });
  
      return res.status(200).json({
        success: true,
        message: 'Available vehicles fetched successfully.',
        data: availableVehicles,
      });
    } catch (error) {
      console.error('Error fetching available vehicles:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });


router.post('/booking', validate(bookingVal.bookingValidation),async (req, res) => {
    try {
      const { vehicleId, bookingStartTime, bookingEndTime,lastName,firstName } = req.body;
   
      console.log(req.body,"Sssssssssssss")
      const overlapExists = await Booking.findOne({
        where: {
          VehicleId: vehicleId,
          [Op.and]: [
            { startTime: { [Op.lt]: bookingEndTime } },
            { endTime: { [Op.gt]: bookingStartTime } },
          ],
        },
      });
  
      if (overlapExists) {
        return res.status(409).json({
          success: false,
          message: 'This vehicle is already booked during the selected time range.',
        });
      }
  
      //create new booking
      const newBooking = await Booking.create({
        firstName:firstName,
        lastName:lastName,
        VehicleId: vehicleId,
        startTime: bookingStartTime,
        endTime: bookingEndTime,
      });
  
      return res.status(201).json({
        success: true,
        message: 'Booking created successfully.',
        data: newBooking,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });


  const getRentedVehicleIds = async (date) => {
    try {

      let currentDate 
      if(!date){
        currentDate=new Date()
      }else{
        currentDate=new Date(date)
      }

      const activeBookings = await Booking.findAll({
        where: {
          [Op.or]: [
            {
              startTime: { [Op.lte]: currentDate },
              endTime: { [Op.gte]: currentDate },
            },
            {
              startTime: { [Op.gte]: currentDate },
              endTime: { [Op.gte]: currentDate },
            }
          ]
        },
        attributes: ['VehicleId'],
        raw: true,
      });

      console.log(activeBookings,"aaaaaaaaaaaaa")
 
      const rentedVehicleIds = activeBookings.map(booking => booking.VehicleId);
      console.log(rentedVehicleIds,"wwwwwwwwwwww")
      return rentedVehicleIds;
    } catch (error) {
      console.error('Error fetching rented vehicle IDs:', error);
      return []; 
    }
  };
  
module.exports = router;