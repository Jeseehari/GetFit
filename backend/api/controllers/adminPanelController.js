const ClassSchedule = require('../models/ClassSchedule');

/**
 * Fetches class schedule data grouped by date
 * and calculates the sum of classnum for each date
 * @param {Object} request 
 * @param {Object} response
 */
exports.getClassSchedulesByDate = (request, response) => {
  console.log("success");
  ClassSchedule.aggregate([
    {
      $group: {
        _id: '$date',
        classnum: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        classnum: 1
      }
    }
  ])
    .then(result => {
      console.log(result)
      response.json({ result });
    })
    .catch(error => {
      response.status(500).json({ error: 'An error occurred' });
    });
};
