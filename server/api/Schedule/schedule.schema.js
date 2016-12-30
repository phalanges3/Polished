const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
const User = require('../Users/user.schema')

const Schedule = db.define('schedule', {
  userId: {
    type: Sequelize.INTEGER
  },
  day: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  start: {
    type: Sequelize.TIME
  },
  end: {
    type: Sequelize.TIME
  }
})

Schedule.sync().then(() => {
  console.log('SCHEDULE table successfully created.')
})

module.exports = Schedule
