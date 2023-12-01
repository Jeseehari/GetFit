const FreeTrial = require('../models/FreeTrial');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Free trial new members
 */
exports.freeTrial = (request, response) => {    
    const newFreeTrial = new FreeTrial({
      name: request.body.name,
      email: request.body.email,
      contactNumber: request.body.contactNumber
    });

    newFreeTrial.save()
    .then(documents => {
        console.log("Successfully saved details in DB in freeTrial", documents);
        
        response.status(200).json(documents);
    })
    .catch(error => {
        console.log("Error saving details in DB in freeTrial", error);
        
        response.status(500).json(error);
    });
};


/**
* Fetch all free trial members
*/
exports.getAllFreeTrials = (request, response) => {
    FreeTrial.find()
      .then(members => {
        response.status(200).json(members);
      })
      .catch(error => {
        response.status(500).json(error);
      });
  };