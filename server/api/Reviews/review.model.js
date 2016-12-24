const Review = require('./review.schema')

module.exports = {

  addReview: (req, res) => {
    Review
        .create({
          rating: req.body.rating,
          general_rating: req.body.general_rating,
          reviewer_name: req.body.reviewer_name,
          reviewed_name: req.body.reviewed_name,
          review_content: req.body.review_content,
          firstName: req.body.firstName
        })
        .then((review) => {
          res.send(review)
        })
  },
  getReviews: (req, res) => {
    Review
      .find({where: {reviewer_name: req.query.reviewer_name}})
      .then((review) => {
        res.send(review)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  getOneReview: (req, res) => {
    Review
      .findOne({where: {reviewer_name: req.query.reviewer_name}})
      .then((review) => {
        res.send(review)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  updateReview: (req, res) => {
    Review
      .findOne({where: {reviewer_name: req.query.reviewer_name}})
      .then((review) => {
        if (review) {
          review
            .updateAttributes({
              rating: req.body.rating,
              general_rating: req.body.general_rating,
              reviewer_name: req.body.reviewer_name,
              reviewed_name: req.body.reviewed_name,
              review_content: req.body.review_content,
              firstName: req.body.firstName
            })
        }
        res.send(review)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in PUT: ', err)
        }
      })
  }
}

