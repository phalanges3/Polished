const Sequelize = require('sequelize')
const db = require('../config/db.config.js') // check filepath

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
  review_content: {
    type: Sequelize.STRING
  }

})

module.exports = Review
