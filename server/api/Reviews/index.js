const reviewSchema = require('./review.schema')
const reviewRoute = require('./review.routes')
const reviewModel = require('./review.model')

module.exports = {
  reviewSchema: reviewSchema,
  reviewRoute: reviewRoute,
  reviewModel: reviewModel
}
