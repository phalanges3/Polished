const express = require('express')
const router = express.Router()
const scheduleModel = require('./schedule.model')
// add your filepath in first argument. /api is already signified within base route
router.post('/', (req, res) => {
  console.log('within schedule route')
  scheduleModel.addAvailability(req, res)
})
router.post('/getschedule', (req, res) => {
  scheduleModel.getSchedule(req, res)
})
module.exports = router
