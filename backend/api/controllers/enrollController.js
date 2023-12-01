const Enroll = require('../models/Enroll');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Enroll new members
 */
exports.enroll = (request, response) => {    
    const newEnroll = new Enroll({
        email: request.body.email,
        password: request.body.password,
        city: request.body.city
    });

    newEnroll.save()
    .then(documents => {
        console.log("Successfully saved details in DB in enroll", documents);
        
        response.status(200).json(documents);
    })
    .catch(error => {
        console.log("Error saving details in DB in enroll", error);
        
        response.status(500).json(error);
    });
};