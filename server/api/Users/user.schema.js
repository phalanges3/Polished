const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
const Review = require('../Reviews/review.schema')
const Appointment = require('../Appointments/appointment.schema')
const Schedule = require('../Schedule/schedule.schema')

const User = db.define('user', {
  isVendor: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  profile_image_url: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.INTEGER
  },
  userName: {
    type: Sequelize.STRING
  },
  nailCertification: {
    type: Sequelize.INTEGER
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
  }
})
// relationships
Review.belongsTo(User)
User.hasMany(Review, {foreignKey: 'userId'})
Appointment.belongsTo(User)
User.hasMany(Appointment, {foreignKey: 'userId'})
Schedule.belongsTo(User)
User.hasMany(Schedule, {foreignKey: 'userId'})

User.sync().then(() => {
  console.log('USER table successfully created.')
})

module.exports = User

// need password?
