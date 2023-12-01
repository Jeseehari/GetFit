const Booking = require('../models/Booking');
const CheckInOut = require('../models/CheckInOut');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch activies of user by week. month, and 90 days
 */
exports.analytics = (request, response) => {
    if(request.params.type == "hours") {
        CheckInOut.aggregate([
            {
              $addFields: {
                date: {
                  $toDate: "$checkin_time"
                }
              }
            },
            {
              $addFields: {
                week: {
                  $isoWeek: "$date"
                },
                year: {
                  $year: "$date"
                },
                month: {
                  $month: "$date"
                },
                day: {
                  $dayOfMonth: "$date"
                }
              }
            },
            {
              $group: {
                _id: {
                  year: "$year",
                  week: "$week",
                  month: "$month",
                  day: "$day"
                },
                hours: {
                  $sum: {
                    $divide: [
                      {
                        $subtract: ["$checkout_time", "$checkin_time"]
                      },
                      3600000
                    ]
                  }
                }
              }
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.week": 1,
                "_id.month": 1,
                "_id.day": 1
              }
            }
        ])
          .then(documents => {
            console.log("Successfully fetched analytics from DB in analytics", documents);

            response.status(200).json(documents);
        })
        .catch(error => {
            console.log("Error fetching analytics from DB in analytics", error);

            response.status(500).json(error);
        });
    }
    else {    
        Booking.aggregate([
            {
            $addFields: {
                date: { $toDate: "$time" }
            }
            },
            {
            $facet: {
                byDay: [
                {
                    $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                    date: {
                        $dateFromParts: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: "$_id.day"
                        }
                    },
                    count: 1,
                    _id: 0
                    }
                }
                ],
                byWeek: [
                {
                    $group: {
                    _id: {
                        year: { $isoWeekYear: "$date" },
                        week: { $isoWeek: "$date" }
                    },
                    count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                    date: { $dateFromParts: { isoWeekYear: "$_id.year", isoWeek: "$_id.week" } },
                    count: 1,
                    _id: 0
                    }
                }
                ]
            }
            },
            {
            $project: {
                results: { $concatArrays: ["$byDay", "$byWeek"] }
            }
            },
            {
            $unwind: "$results"
            },
            {
            $group: {
                _id: "$results.date",
                dayCount: { $sum: "$results.count" },
                weekCount: { $sum: "$results.count" }
            }
            },
            {
            $project: {
                date: "$_id",
                dayCount: 1,
                weekCount: 1,
                _id: 0
            }
            },
            {
            $sort: { date: 1 }
            }
        ])      
        .then(documents => {
            console.log("Successfully fetched analytics from DB in analytics", documents);

            response.status(200).json(documents);
        })
        .catch(error => {
            console.log("Error fetching analytics from DB in analytics", error);

            response.status(500).json(error);
        });
    }
};
