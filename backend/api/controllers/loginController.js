const Enroll = require('../models/Enroll');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Login members
 */
exports.login = (request, response) => {    
    Enroll.findOne({ email: request.body.email, password: request.body.password })
    .then(document => {
        console.log("Successfully verified details in DB in login", document);
        
        response.status(200).json(document);
    })
    .catch(error => {
        console.log("Error verifying details in DB in login", error);
        
        response.status(500).json(error);
    });
};