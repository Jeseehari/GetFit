const ClassSchedule = require('../models/ClassSchedule');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch class schedules based on date
 */
 exports.getClassesByDate = (request, response) => {   
  const { date } = request.body;

  ClassSchedule.find({ date: date })
    .then(schedules => {
      const documents = schedules.map(schedule => schedule.toObject()); // Convert mongoose object to plain JavaScript object

      console.log("Successfully fetched class schedules from DB by date", documents);
      response.status(200).json(documents);
    })
    .catch(error => {
      console.log("Error fetching class schedules from DB by date", error);
      response.status(500).json(error);
    });
};

