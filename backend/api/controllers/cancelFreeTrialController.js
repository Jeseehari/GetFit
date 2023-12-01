const FreeTrial = require('../models/FreeTrial');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Cancel free trial new members
 */
// exports.cancelFreeTrial = (request, response) => {    
//     FreeTrial.deleteMany({ email: request.body.email })
//     .then(documents => {
//         console.log("Successfully saved details in DB in freeTrial", documents);
        
//         response.status(200).json(documents);
//     })
//     .catch(error => {
//         console.log("Error saving details in DB in freeTrial", error);
        
//         response.status(500).json(error);
//     });
// };

// exports.getEmailId = (request, response) => {    
//     FreeTrial.find({})
//     .then(documents => {
//         console.log("Successfully saved details in DB in freeTrial", documents);
        
//         response.status(200).json(documents);
//     })
//     .catch(error => {
//         console.log("Error saving details in DB in freeTrial", error);
        
//         response.status(500).json(error);
//     });
// };

exports.cancelFreeTrial = (request, response) => {
    const { email } = request.body;
  
    FreeTrial.findOneAndDelete({ email })
      .then(deletedTrial => {
        if (!deletedTrial) {
          return response.status(404).json({ message: "Free trial not found" });
        }
  
        return response.status(200).json({ message: "Free trial canceled successfully" });
      })
      .catch(error => {
        console.log("Error canceling free trial", error);
        response.status(500).json(error);
      });
  };