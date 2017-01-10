const express = require('express')
const router = express.Router()
const reviewModel = require('./review.model')

router.post('/addreview', (req, res) => {
  console.log('within REVIEW POST')
  reviewModel.addReview(req, res)
})
router.post('/getreviews', (req, res) => {
  console.log('within REVIEW GET')
  reviewModel.getReviews(req, res)
})
router.put('/update', (req, res) => {
  console.log('within REVIEW PUT update')
  reviewModel.updateReview(req, res)
})

router.post('/seedReviews', (req, res) => {
  console.log('within seeding route')
  reviewModel.seedReviews(req, res)
})

module.exports = router
