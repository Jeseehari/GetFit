// routes/index.js
const express = require('express');
const classScheduleController = require('../controllers/classScheduleController');

const router = express.Router();

// Route for creating a class schedule
//router.post('/class-schedules', classScheduleController.createClassSchedule);

router.post('/', (request, response, next) => {
    console.log("Route to Class Schedule", request.body);
    classScheduleController.classSchedule(request, response);
  });
 
// // Route for booking a class
// router.post('/book', classScheduleController.bookClass);

module.exports = router;