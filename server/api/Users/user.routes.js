const express = require('express')
const router = express.Router()
const userModel = require('./user.model')

router.post('/signup', (req, res) => {
  console.log('within USER POST signup')
  userModel.signup(req, res)
})
router.get('/login', (req, res) => {
  console.log('within USER GET login')
  userModel.login(req, res)
})
router.put('/update', (req, res) => {
  console.log('within USER PUT update')
  userModel.updateProfile(req, res)
})

module.exports = router
