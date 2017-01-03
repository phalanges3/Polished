const Review = require('./review.schema')

module.exports = {

  addReview: (req, res) => {
    Review
        .create({
          userId: req.body.userId,
          reviewed_first: req.body.reviewed_first,
          reviewed_last: req.body.reviewed_last,
          reviewer_first: req.body.reviewer_first,
          reviewer_last: req.body.reviewer_last,
          reviewer_id: req.body.reviewer_id,
          rating: req.body.rating,
          review_content: req.body.review_content
        })
        .then((review) => {
          res.send(review)
        })
  },
  getReviews: (req, res) => {
    Review
      .find({where: {userId: req.body.userId}})
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
      .findOne({where: {userId: req.body.userId}})
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
      .findOne({where: {userId: req.body.userId}})
      .then((review) => {
        if (review) {
          review
            .updateAttributes({
              reviewed_first: req.body.reviewed_first,
              reviewed_last: req.body.reviewed_last,
              reviewer_first: req.body.reviewer_first,
              reviewer_last: req.body.reviewer_last,
              rating: req.body.rating,
              review_content: req.body.review_content
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

