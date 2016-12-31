const express = require('express')
const router = express.Router()
const imageModel = require('./image.model')

router.post('/addimage', (req, res) => {
  console.log('within REVIEW POST')
  imageModel.addImage(req, res)
})
router.get('/getimage', (req, res) => {
  console.log('within REVIEW GET')
  imageModel.getImages(req, res)
})

module.exports = router
