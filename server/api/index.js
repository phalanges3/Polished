const db = require('../config/db.config')
const express = require('express')
const router = express.Router()
const user = require('./Users/index')
const appointment = require('./Appointments/index')
const service = require('./Services/index')
const review = require('./Reviews/index')
const image = require('./Image/index')
const schedule = require('./Schedule/index')
const mainRoutesΩ = require('./routes.main')
const payment = require('../config/braintree.js')
// const scrape = require('../config/scrape.js')

const UsersServices = db.define('UsersServices', {

})

UsersServices.sync().then(() => {
  console.log('USERSSERVICES table successfully created.')
})

module.exports = {
  user: user,
  service: service,
  appointment: appointment,
  review: review,
  image: image,
  schedule: schedule,
  payment: payment
}

// This is the base exporting file for all entities.
// If needed, you can import from this index file (which itself imports from each individual index file)rather than importing from the individual file
// itself that you need. hopefully this will shorten file paths and allow for easier scaling
