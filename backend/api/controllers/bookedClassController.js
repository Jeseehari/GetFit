const Booking = require('../models/Booking');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Save booked class schedules for individual
 */
exports.saveBookedClass = (request, response) => {
    const booking = new Booking(request.body);

    booking.save()
    .then(bookings => {
        console.log("Successfully saved details in DB in bookedClass", bookings);
        
        response.status(200).json(bookings);
    })
    .catch(error => {
        console.log("Error saving details in DB in bookedClass", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch booked class schedules for individual
 */
exports.getBookedClass = (request, response) => {    
  Booking.find({ email: request.body.email })
  .then(bookings => {
      console.log("Successfully fetched details from DB in bookedClass", bookings);
      
      response.status(200).json(bookings);
  })
  .catch(error => {
      console.log("Error fetching details from DB in bookedClass", error);
      
      response.status(500).json(error);
  });
};