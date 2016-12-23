const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')

const Appointment = db.define('appointment', {
  date: {
    type: Sequelize.DATE
  },
  time: {
    type: Sequelize.TIME
  },
  address: Sequelize.STRING,
  nail_artist_id: Sequelize.INTEGER,
  nail_artist_first: Sequelize.STRING,
  nail_artist_second:  Sequelize.STRING,
  services_selected: Sequelize.STRING
})

module.exports = Appointment
