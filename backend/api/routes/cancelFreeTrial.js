// const express = require('express');

// const cancelFreeTrialController = require('../controllers/cancelFreeTrialController');

// const router = express.Router();

// router.get('/', (request, response, next) => {
//     console.log("Route to cancelFreeTrial", request.body);
    
//     cancelFreeTrialController.getEmailId(request, response);
// });

// router.post('/', (request, response, next) => {
//     console.log("Route to cancelFreeTrial", request.body);
    
//     cancelFreeTrialController.cancelFreeTrial(request, response);
// });

// module.exports = router;

const express = require('express');
const cancelFreeTrialController = require('../controllers/cancelFreeTrialController');
const router = express.Router();

router.get('/', (request, response, next) => {
  console.log("Route to cancelFreeTrial", request.body);
  cancelFreeTrialController.getEmailId(request, response);
});

router.post('/', (request, response, next) => {
  console.log("Route to cancelFreeTrial", request.body);
  cancelFreeTrialController.cancelFreeTrial(request, response);
});

module.exports = router;
