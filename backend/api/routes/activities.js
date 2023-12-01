const express = require('express');

const activitiesController = require('../controllers/activitiesController');

const router = express.Router();
console.log("Jesee test",activitiesController.activities);
router.post('/', (request, response, next) => {
    console.log("Route to activities", request.body);
    
    activitiesController.activities(request, response);
});
module.exports = router;