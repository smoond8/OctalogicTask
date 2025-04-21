const { Joi } = require('express-validation');

exports.avlVehicleVal=Joi.object({
    date:Joi.string().optional()
})

exports.bookingValidation = Joi.object({
    vehicleId: Joi.number().required(),
    bookingStartTime: Joi.string().required(),
    bookingEndTime: Joi.string().required(),
});