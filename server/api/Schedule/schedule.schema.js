const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
const User = require('../Users/user.schema')

const Schedule = db.define('schedule', {
    userID : {
      type:  Sequelize.INTEGER
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