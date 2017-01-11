const express = require('express')
const router = express.Router()
const serviceModel = require('./service.model')

router.post('/addservice', (req, res) => {
  console.log('within services route')
  serviceModel.addService(req, res)
})

module.exports = router
