const express = require('express');

const enrollController = require('../controllers/enrollController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to enroll", request.body);
    
    enrollController.enroll(request, response);
});

module.exports = router;