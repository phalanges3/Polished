const express = require('express')
const router = express.Router()
const appointmentModel = require('./appointment.model')

router.post('/addappointment', (req, res) => {
    console.log("within appointment POST")
    appointmentModel.addAppointment(req, res)
})
router.get('/getimage', (req, res) => {
    console.log("within appointment GET")
    appointmentModel.getAppointments(req, res)
})

module.exports = router