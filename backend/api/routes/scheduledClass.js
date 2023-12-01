const express = require('express');
const scheduledClassController = require('../controllers/scheduledClassController');

const router = express.Router();

// Route for getting class schedules by date

router.post('/', (request, response, next) => {
    console.log("Route to getClassesByDate", request.body);
    scheduledClassController.getClassesByDate(request, response);
});

module.exports = router;
