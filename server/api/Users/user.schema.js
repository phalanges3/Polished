const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
const Review = require('../Reviews/review.schema')

const User = db.define('user', {
  isVendor: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  name: {
    type: Sequelize.STRING
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
  },
  password: {
    type: Sequelize.STRING
  }
})
// relationships
Review.belongsTo(User)
User.hasMany(Review)

User.sync().then(() => {
  console.log('USER table successfully created.')
})

module.exports = User

// need password?
