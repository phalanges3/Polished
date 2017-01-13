const express = require('express')
const router = express.Router()
const userModel = require('./user.model')

router.post('/signup', (req, res) => {
  console.log('within USER POST signup')
  userModel.signup(req, res)
})
router.post('/login', (req, res) => {
  console.log('within USER login', req.query)
  userModel.login(req, res)
})
router.put('/update', (req, res) => {
  console.log('within USER PUT update')
  userModel.updateProfile(req, res)
})
router.post('/seedusers', (req, res) => {
  console.log('within USER PUT update')
  userModel.seedUsers(req, res)
})
router.delete('/delete', (req, res) => {
  console.log('within USER PUT update')
  userModel.deleteProfile(req, res)
})

module.exports = router

