const express = require('express')
const router = express.Router()
// const appointmentSchema = require('./Appointments/appointment.schema')
// const appointmentRoute = require('./Appointments/appointment.routes')
// const appointmentModel = require('./Appointments/appointment.model')
// const imageModel = require('./Image/image.model')
// const imageSchema = require('./Image/image.schema')
// const imageRoute = require('./Image/image.routes')
// const reviewSchema = require('./Reviews/review.schema')
// const reviewRoute = require('./Reviews/review.routes')
// const reviewModel = require('./Reviews/review.model')
// const scheduleSchema = require('./Schedule/schedule.schema')
// const scheduleRoute = require('./Schedule/schedule.routes')
// const scheduleModel = require('./Schedule/schedule.model')
// const serviceSchema = require('./Services/service.schema')
// const serviceRoute = require('./Services/service.routes')
// const serviceModel = require('./Services/service.model')
// const userSchema = require('./Users/user.schema')
// const userRoute = require('./Users/user.routes')
// const userModel = require('./Users/user.model')
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
//   appointmentSchema: appointmentSchema,
//   appointmentRoute: appointmentRoute,
//   appointmentModel: appointmentModel,
//   imageModel: imageModel,
//   imageSchema: imageSchema,
//   imageRoute: imageRoute,
//   reviewSchema: reviewSchema,
//   reviewRoute: reviewRoute,
//   reviewModel: reviewModel,
//   scheduleSchema: scheduleSchema,
//   scheduleRoute: scheduleRoute,
//   scheduleModel: scheduleModel,
//   serviceSchema: serviceSchema,
//   serviceRoute: serviceRoute,
//   serviceModel: serviceModel,
//   userSchema: userSchema,
//   userRoute: userRoute,
//   userModel: userModel
}

