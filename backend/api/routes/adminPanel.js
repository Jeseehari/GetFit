const express = require('express');
const router = express.Router();
const adminPanelController = require('../controllers/adminPanelController');

// GET route for fetching class schedule data grouped by date

router.get('/', adminPanelController.getClassSchedulesByDate);



// router.post('/', (request, response, next) => {
//     console.log("Route to activities", request.body);
    
//     adminPanelController.getClassSchedulesByDate(request, response);
// });



module.exports = router;
