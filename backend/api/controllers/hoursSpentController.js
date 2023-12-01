const CheckInOut = require('../models/CheckInOut');
const moment = require('moment');

/**
 * Fetches the number of records for the current day and the past 7 days
 * @param {Object} request
 * @param {Object} response
 */
exports.getRecordsByDate = async (request, response) => {
  const currentDate = moment().startOf('day');
  const past7DaysDate = moment().subtract(7, 'days').startOf('day');

  try {
    const currentDayResult = await CheckInOut.aggregate([
      {
        $match: {
          checkin_time: {
            $gte: currentDate.toDate(),
            $lte: moment().endOf('day').toDate()
          }
        }
      },
      {
        $group: {
          _id: null,
          currentDayCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ['$checkin_time', currentDate.toDate()] },
                    { $lte: ['$checkout_time', moment().endOf('day').toDate()] }
                  ]
                },
                '$hours_worked',
                0
              ]
            }
          }
        }
      }
    ]);

    const past7DaysResult = await CheckInOut.aggregate([
      {
        $match: {
          checkin_time: {
            $gte: past7DaysDate.toDate(),
            $lte: currentDate.toDate()
          }
        }
      },
      {
        $group: {
          _id: null,
          past7DaysCount: { $sum: '$hours_worked' }
        }
      }
    ]);

    const currentDayCount = currentDayResult.length > 0 ? currentDayResult[0].currentDayCount : 0;
    const past7DaysCount = past7DaysResult.length > 0 ? past7DaysResult[0].past7DaysCount : 0;

    response.json({ currentDayCount, past7DaysCount });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRecordsByTime = async (request, response) => {
  const currentDate = new Date();
  const past7DaysDate = new Date();
  past7DaysDate.setDate(past7DaysDate.getDate() - 7);

  try {
    const currentDayResult = await CheckInOut.aggregate([
      {
        $match: {
          checkin_time: {
            $gte: past7DaysDate,
            $lte: currentDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          currentDayCount: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$checkin_time" } },
                    { $dateToString: { format: "%Y-%m-%d", date: currentDate } },
                  ],
                },
                1,
                0,
              ],
            },
          },
          past7DaysCount: {
            $sum: {
              $cond: [
                {
                  $gte: [
                    {
                      $dateToString: { format: "%Y-%m-%d", date: "$checkin_time" },
                    },
                    { $dateToString: { format: "%Y-%m-%d", date: past7DaysDate } },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          currentDayCount: 1,
          past7DaysCount: 1,
        },
      },
    ]);

    response.json(currentDayResult[0]);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
