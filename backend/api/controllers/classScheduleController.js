const ClassSchedule = require('../models/ClassSchedule');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * create new class schedule
 */
exports.classSchedule = (request, response) => {    
    const newClassSchedule = new ClassSchedule({
        title: request.body.title,
        city: request.body.city,
        date: request.body.date,
        time: request.body.time
    });

    newClassSchedule.save()
    .then(documents => {
        console.log("Successfully saved details in DB in Class Schedule", documents);
        
        response.status(200).json(documents);
    })
    .catch(error => {
        console.log("Error saving details in DB in Class Schedule", error);
        
        response.status(500).json(error);
    });
};
