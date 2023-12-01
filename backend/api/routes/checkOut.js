const express = require('express');
const checkOutController = require('../controllers/checkOutController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to checkInOut", request.body);
    
    checkOutController.checkOut(request, response);
});

module.exports = router;
