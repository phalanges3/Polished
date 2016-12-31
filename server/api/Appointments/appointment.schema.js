const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')

const Appointment = db.define('appointment', {
  userId: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATE
  },
  start: {
    type: Sequelize.TIME
  },
  end: {
    type: Sequelize.TIME
  },
  houseNumber: {
    type: Sequelize.INTEGER
  },
  streetName: {
    type: Sequelize.STRING
  },
  unitType: {
    type: Sequelize.STRING
  },
  unitNumber: {
    type: Sequelize.INTEGER
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.INTEGER
  },
  clientId: Sequelize.INTEGER,
  nail_artist_first: Sequelize.STRING,
  nail_artist_second: Sequelize.STRING,
  services_selected: Sequelize.STRING,
  addOns: Sequelize.STRING,
  total: Sequelize.STRING
})

Appointment.sync().then(() => {
  console.log('Appointment table successfully created.')
})

module.exports = Appointment
