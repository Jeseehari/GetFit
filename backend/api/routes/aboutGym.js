const express = require('express');

const aboutGymController = require('../controllers/aboutGymController');

const router = express.Router();

router.get('/:city', (request, response, next) => {
    console.log("Route to about gym", request.params);
    
    aboutGymController.aboutGymInformation(request, response);
});

module.exports = router;


