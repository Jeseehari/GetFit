const CheckInOut = require('../models/CheckInOut');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Check Out individual
 */
exports.checkOut = (request, response) => {
  const email = request.body.email;
  const checkoutTime = new Date(request.body.checkout);

  // Fetch the check-in document
  CheckInOut.findOne({ email: email, checkout_time: null })
    .then(checkinDoc => {
      if (checkinDoc) {
        const checkinTime = checkinDoc.checkin_time;

        const hoursWorked = Math.abs(checkoutTime - checkinTime) / (1000 * 60 * 60); // Calculate the hours worked

        // Update the check-out document
        CheckInOut.findOneAndUpdate(
          {
            email: email,
            checkout_time: null // only update records that don't have a checkout time yet
          },
          {
            checkout_time: checkoutTime,
            hours_worked: hoursWorked
          },
          { new: true } // return the updated document
        )
          .then(document => {
            console.log("Successfully updated details in DB in checkOut", document);
            response.status(200).json(document);
          })
          .catch(error => {
            console.log("Error updating details in DB in checkOut", error);
            response.status(500).json(error);
          });
      } else {
        console.log("No active check-in found for the provided email");
        response.status(404).json({ message: "No active check-in found for the provided email" });
      }
    })
    .catch(error => {
      console.log("Error retrieving check-in details from DB", error);
      response.status(500).json(error);
    });
};

