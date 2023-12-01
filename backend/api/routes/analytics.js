const express = require('express');

const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

router.get('/', (request, response, next) => {
    console.log("Route to analytics", request.body);
    
    analyticsController.analytics(request, response);
});

router.get('/:type', (request, response, next) => {
    console.log("Route to analytics", request.body);
    
    analyticsController.analytics(request, response);
});

module.exports = router;