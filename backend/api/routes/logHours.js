const express = require('express');

const logHoursController = require('../controllers/logHoursController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to logHours", request.body);
    
    logHoursController.logHours(request, response);
});

module.exports = router;