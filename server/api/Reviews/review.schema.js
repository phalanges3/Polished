const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')

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
  reviewer_profile_pic: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  },
  review_content: {
    type: Sequelize.STRING
  },
  review_date: {
    type: Sequelize.STRING
  },
  image1: {
    type: Sequelize.STRING
  },
  image2: {
    type: Sequelize.STRING
  },
  image3: {
    type: Sequelize.STRING
  }
})

Review.sync({force:true}).then(() => {
  console.log('Review table successfully created.')
})

module.exports = Review
