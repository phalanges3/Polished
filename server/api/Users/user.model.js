const User = require('./user.schema')

module.exports = {

  signup: (req, res) => {
      // console.log("REEEEEEQQQQ", req.body)
    User
        .create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          isVendor: req.body.isVendor
        })
    res.send('works in signup')
  },
  login: (req, res) => {

  },
  updateProfile: (req, res) => {

  }
}

