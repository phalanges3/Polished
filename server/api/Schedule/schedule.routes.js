const express = require('express')
const router = express.Router()
const scheduleModel = require('./schedule.model')

router.post('/', (req, res) => {
  console.log('within schedule route')
  scheduleModel.addAvailability(req, res)
})
router.post('/getschedule', (req, res) => {
  scheduleModel.getSchedule(req, res)
})
router.put('/updatehours', (req, res) => {
  console.log('in update hours line 13')
  scheduleModel.updateHours(req, res)
})
module.exports = router
