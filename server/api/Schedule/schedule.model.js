const Schedule = require('./schedule.schema')
const User = require('../Users/user.schema')

module.exports = {
  addAvailability: (req, res) => {
    console.log('within schedule route', req)
    Schedule.create({
      userId: req.body.userId,
      day: req.body.day,
      date: req.body.date,
      start: req.body.start,
      end: req.body.end
    })
    .then(schedule => {
      res.send(schedule)
    })
  },
  updateHours: (req, res) => {
    console.log('in update schedule', req)
    Schedule.find({where: {userId: req.body.userId, day: req.body.day}})
    .then((hours) => {
      if (hours) {
        hours.updateAttributes({
          start: req.body.start,
          end: req.body.end
        })
      }
      res.send(hours)
    })
  },
  getSchedule: (req, res) => {
    Schedule.findAll({where: {userId: req.body.userId}})
    .then(results => {
      res.send(results)
    })
  }

}
