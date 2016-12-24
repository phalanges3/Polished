const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
//const User = require('../Users/user.schema.js')
// console.log('USER WITHIN REVIEW: ', User)

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER
  },
  general_rating: {
    type: Sequelize.INTEGER
  },
  reviewer_name: {
    type: Sequelize.STRING
  },
  reviewed_name: {
    type: Sequelize.STRING
  },
  review_content: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  }
})

Review.sync().then(() => {
  console.log('Review table successfully created.')
})

module.exports = Review
