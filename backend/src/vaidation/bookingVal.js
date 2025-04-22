const { Joi } = require('express-validation');

exports.avlVehicleVal=Joi.object({
    date:Joi.string().optional(),
})

exports.VehicleTypeVal=Joi.object({
 noOfWheels:Joi.number().valid(2,4).required()
})


exports.VehicleVal=Joi.object({
    type:Joi.string().valid('car','bike').required(),
    typeId:Joi.number().required()
   })
exports.bookingValidation = Joi.object({
    vehicleId: Joi.number().required(),
    bookingStartTime: Joi.string().required(),
    bookingEndTime: Joi.string().required(),
    firstName:  Joi.string().optional(),
    lastName:Joi.string().optional()
});