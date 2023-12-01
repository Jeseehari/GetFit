const express = require('express');
const router = express.Router();
const hoursSpentController = require('../controllers/hoursSpentController');
console.log("Avanakshi")
router.get('/', (request, response, next) => {
    console.log("Route to hoursSpent", request.params);
    
    hoursSpentController.getRecordsByDate(request, response);
});

router.get('/time', (request, response, next) => {
    console.log("Route to hoursSpentTime", request.params);
    
    hoursSpentController.getRecordsByTime(request, response);
});

module.exports = router;
