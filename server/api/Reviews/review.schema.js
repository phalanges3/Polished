const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
// const User = require('../Users/user.schema.js')
// console.log('USER WITHIN REVIEW: ', User)

const Review = db.define('review', {
  userId: {
    type: Sequelize.INTEGER
  },
  reviewed_first: {
    type: Sequelize.STRING
  },
  reviewed_last: {
    type: Sequelize.STRING
  },
  reviewer_first: {
    type: Sequelize.STRING
  },
  reviewer_last: {
    type: Sequelize.STRING
  },
  reviewer_id: {
    type: Sequelize.INTEGER
  },
  rating: {
    type: Sequelize.INTEGER
  },
  review_content: {
    type: Sequelize.STRING
  }
})

Review.sync().then(() => {
  console.log('Review table successfully created.')
})

module.exports = Review
