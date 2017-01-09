const User = require('./user.schema')
const Schedule =  require('../schedule/schedule.schema')

module.exports = {

  signup: (req, res) => {
    User
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          isVendor: req.body.isVendor
        })
        .then((user) => {
          if(req.body.isVendor===1){
              Schedule.create({
            userId: req.body.id,
            day: "Sunday",
            start: "09:00:00",
            end: "17:00:00"
          })
          .then(schedule => {
            Schedule.create({
            userId: req.body.id,
            day: "Monday",
            start: "09:00:00",
            end: "17:00:00"
            })
            .then(schedule => {
              Schedule.create({
                userId: req.body.id,
                day: "Sunday",
                start: "09:00:00",
                end: "17:00:00"
              })
              .then(schedule => {
                Schedule.create({
                  userId: req.body.id,
                  day: "Tuesday",
                  start: "09:00:00",
                  end: "17:00:00"
                })
                .then(schedule => {
                  Schedule.create({
                    userId: req.body.id,
                    day: "Wednesday",
                    start: "09:00:00",
                    end: "17:00:00"
                  })
                  .then(schedule => {
                    Schedule.create({
                      userId: req.body.id,
                      day: "Thursday",
                      start: "09:00:00",
                      end: "17:00:00"
                    })
                    .then(schedule => {
                      Schedule.create({
                        userId: req.body.id,
                        day: "Friday",
                        start: "09:00:00",
                        end: "17:00:00"
                      })
                      .then(schedule => {
                        Schedule.create({
                          userId: req.body.id,
                          day: "Saturday",
                          start: "09:00:00",
                          end: "17:00:00"
                        })
                        .then(schedule => {
                          res.send(schedule)
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        }  else {
          res.send(user)
        }
        
        })
  },
  login: (req, res) => {
    User
      .findOne({where: {userName: req.body.userName}})
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  updateProfile: (req, res) => {
    User
      .findOne({where: {userName: req.body.userName}})
      .then((user) => {
        console.log('user: ', user)
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
              general_rating: req.body.general_rating,
              nailCertification: req.body.nailCertification,
              houseNumber: req.body.houseNumber,
              streetName: req.body.streetName,
              unitType: req.body.unitType,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode,
              latitude: req.body.latitude,
              longitude: req.body.longitude
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

