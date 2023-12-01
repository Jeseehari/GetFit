const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const aboutGymRoute = require('./api/routes/aboutGym');
const bookedClassRoute = require('./api/routes/bookedClass');
const logHours = require('./api/routes/logHours');
const activities = require('./api/routes/activities');
const enroll = require('./api/routes/enroll');
const freeTrial = require('./api/routes/freeTrial');
const cancelFreeTrial = require('./api/routes/cancelFreeTrial');
const login = require('./api/routes/login');
const analytics = require('./api/routes/analytics');
const classSchedule = require('./api/routes/classSchedule');
const scheduledClass = require('./api/routes/scheduledClass');
const checkIn= require('./api/routes/checkIn');
const checkOut= require('./api/routes/checkOut');
const adminPanel = require('./api/routes/adminPanel');
const hoursSpent = require('./api/routes/hoursSpent');


const app = express();

mongoose.connect(`mongodb+srv://admin:admin@healthclubtracker.8zb4beh.mongodb.net/?retryWrites=true&w=majority`);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');

    if(request.method === 'OPTIONS') {
        request.header('Access-Control-Allow-Methods', '*');
        return response.status(200).json({});
    }

    next();
});

app.use('/aboutgym', aboutGymRoute);
app.use('/booked-class', bookedClassRoute);
app.use('/log-hours', logHours);
app.use('/activities', activities);
app.use('/enroll', enroll);
app.use('/free-trial', freeTrial);
app.use('/cancel-free-trial', cancelFreeTrial);
app.use('/login', login);
app.use('/analytics', analytics);
app.use('/class-schedule', classSchedule);
app.use('/scheduled-class', scheduledClass);
app.use('/check-in', checkIn);
app.use('/check-out',checkOut);
app.use('/admin-Panel',adminPanel);
app.use('/hoursspent',hoursSpent);

app.use((request, response, next) => {
    const error = new Error('Not found API');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;