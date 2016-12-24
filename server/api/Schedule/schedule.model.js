const Schedule = require('./schedule.schema')
const User = require('../Users/user.schema')

module.exports = { 
  addAvailability: (req, res) => {
  	console.log('within schedule route',  req)
    Schedule.create({
      userID : req.body.userID,
      date: req.body.date,
      start: req.body.start,
      end: req.body.end
    })
    .then(schedule => {
    	res.send(schedule)
    })
  }
  
}