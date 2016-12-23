const express = require('express')
const router = express.Router()
const mainRouter = require('./index')
//console.log('MAINROUTER: ', mainRouter)

router.use('/user', mainRouter.user.userRoute)

router.use('/service', mainRouter.service.serviceRoute)

router.use('/review', mainRouter.review.reviewRoute)

router.use('/schedule', mainRouter.schedule.scheduleRoute)

router.use('/service', mainRouter.service.serviceRoute)

router.use('/image', mainRouter.image.imageRoute)

router.use('/appointment', mainRouter.appointment.appointmentRoute)

module.exports = router
