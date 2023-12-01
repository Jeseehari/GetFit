const LogHour = require('../models/LogHour');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Log Hours for exercise 
 */
exports.logHours = (request, response) => {
    const logHours = new LogHour({
        date: new Date(request.body.date),
        email: request.body.email,
        exercise: request.body.exercise
    });

    logHours.save()
    .then(document => {
        console.log("Successfully saved hours in DB in logHours", document);

        response.status(200).json(document);
    })
    .catch(error => {
        console.log("Error saving details in DB in logHours", error);

        response.status(500).json(error);
    });
};
