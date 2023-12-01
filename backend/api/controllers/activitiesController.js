const LogHour = require('../models/LogHour');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch activies of user by week. month, and 90 days
 */
exports.activities = (request, response) => {    
    LogHour.aggregate([
        {
          $match: {
            email: request.body.email
          }
        },
        {
          $addFields: {
            "week": {
              $gte: ["$date", { $subtract: [new Date(), 7 * 24 * 60 * 60 * 1000] }]
            },
            "month": {
              $gte: ["$date", { $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000] }]
            },
            "ninetyDays": {
              $gte: ["$date", { $subtract: [new Date(), 90 * 24 * 60 * 60 * 1000] }]
            }
          }
        },
        {
          $group: {
            _id: null,
            threadmillWeek: { $sum: { $cond: ["$week", "$exercise.threadmill", 0] } },
            cyclingWeek: { $sum: { $cond: ["$week", "$exercise.cycling", 0] } },
            stairMachinesWeek: { $sum: { $cond: ["$week", "$exercise.stair_machines", 0] } },
            weightTrainingWeek: { $sum: { $cond: ["$week", "$exercise.weight_training", 0] } },
      
            threadmillMonth: { $sum: { $cond: ["$month", "$exercise.threadmill", 0] } },
            cyclingMonth: { $sum: { $cond: ["$month", "$exercise.cycling", 0] } },
            stairMachinesMonth: { $sum: { $cond: ["$month", "$exercise.stair_machines", 0] } },
            weightTrainingMonth: { $sum: { $cond: ["$month", "$exercise.weight_training", 0] } },
      
            threadmillNinetyDays: { $sum: { $cond: ["$ninetyDays", "$exercise.threadmill", 0] } },
            cyclingNinetyDays: { $sum: { $cond: ["$ninetyDays", "$exercise.cycling", 0] } },
            stairMachinesNinetyDays: { $sum: { $cond: ["$ninetyDays", "$exercise.stair_machines", 0] } },
            weightTrainingNinetyDays: { $sum: { $cond: ["$ninetyDays", "$exercise.weight_training", 0] } }
          }
        }
      ])
    .then(documents => {
        console.log("Successfully fetched activities from DB in activities", documents);

        response.status(200).json(documents[0]);
    })
    .catch(error => {
        console.log("Error fetching activities from DB in activities", error);

        response.status(500).json(error);
    });
};
