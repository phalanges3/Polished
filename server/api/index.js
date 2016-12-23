const express = require('express')
const router = express.Router()
const user = require('./Users/index')
const appointment = require('./Appointments/index')
const service = require('./Services/index')
const review = require('./Reviews/index')
const image = require('./Image/index')
const schedule = require('./Schedule/index')

module.exports = {
  user: user,
  service: service,
  appointment: appointment,
  review: review,
  image: image,
  schedule: schedule
}

