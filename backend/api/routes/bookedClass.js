const express = require('express');

const bookedClassController = require('../controllers/bookedClassController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to bookedClass", request.body);
    
    bookedClassController.saveBookedClass(request, response);
});

router.post('/fetch', (request, response, next) => {
    console.log("Route to bookedClass", request.body);
    
    bookedClassController.getBookedClass(request, response);
});

module.exports = router;