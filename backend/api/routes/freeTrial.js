const express = require('express');

const freeTrialController = require('../controllers/freeTrialController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to freeTrial", request.body);
    
    freeTrialController.freeTrial(request, response);
});

router.get('/', freeTrialController.getAllFreeTrials);


module.exports = router;