const express = require('express');
const checkInController = require('../controllers/checkInController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to checkInOut", request.body);
    
    checkInController.checkIn(request, response);
});;

module.exports = router;

