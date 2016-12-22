const express = require('express')
const router = express.Router()
const userControllers = require('./user.controller')

router
    .route('/auth')
    .get(userControllers.get)
router
    .route('/auth')
    .post(userControllers.post)


module.exports = router
