const express = require('express')
const router = express.Router()
const mainRouter = require('./index')
// console.log('MAINROUTER: ', mainRouter)

router.use('/appointment', mainRouter.appointment.appointmentRoute)
router.use('/image', mainRouter.image.imageRoute)
router.use('/review', mainRouter.review.reviewRoute)
router.use('/schedule', mainRouter.schedule.scheduleRoute)
router.use('/service', mainRouter.service.serviceRoute)
router.use('/user', mainRouter.user.userRoute)

module.exports = router
