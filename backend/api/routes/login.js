const express = require('express');

const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/', (request, response, next) => {
    console.log("Route to login", request.body);
    
    loginController.login(request, response);
});

module.exports = router;