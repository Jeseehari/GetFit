const CheckIn = require('../models/CheckInOut');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Check In individual
 */
exports.checkIn = (request, response) => {    
    const newCheckin = new CheckIn({
        email: request.body.email,
        checkin_time: new Date(request.body.checkin),
        checkout_time: "",
        hours_worked: request.body.total
    });
      

    newCheckin.save()
    .then(document => {
        console.log("Successfully saved details in DB in checkIn", document);
        
        response.status(200).json(document);
    })
    .catch(error => {
        console.log("Error saving details in DB in checkIn", error);
        
        response.status(500).json(error);
    });
};
