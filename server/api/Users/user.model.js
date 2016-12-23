const User = require('./user.schema')

module.exports = {

  signup: (req, res) => {
    User
        .create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          isVendor: req.body.isVendor
        })
        .then((user) => {
          res.send(user)
        })
  },
  login: (req, res) => {
    User
      .findOne({where: {email: req.query.email}})
      .then((user) => {
        console.log("found USER: ", user)
        res.send(user)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  updateProfile: (req, res) => {
    console.log('within update')
    User
      .findOne({where: {email: req.body.email}})
      .then((user) => {
        if (user) {
          user
            .updateAttributes({
              isVendor: req.body.isVendor,
              profile_image_url: req.body.profile_image_url,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password,
              phoneNumber: req.body.phoneNumber,
              userName: req.body.userName,
              nailCertification: req.body.nailCertification,
              houseNumber: req.body.houseNumber,
              streetName: req.body.streetName,
              unitType: req.body.unitType,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode
            })
        }
        res.send(user)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in PUT: ', err)
        }
      })
  }
}

