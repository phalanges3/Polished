const express = require('express')
const router = express.Router()
const serviceModel = require('./service.model')
// add your filepath in first argument. /api is already signified within base route
router.post('/addservice', (req, res) => {
  console.log('within services route')
  serviceModel.addService(req, res)
})

module.exports = router
