const Appointment = require('./appointment.schema')
const User = require('../users/user.schema')
const Schedule = require('../schedule/schedule.schema')

module.exports = {
  findAvailableArtists: (req, res) => {
    var results = []
    User.findAll({
      include: [{
        model: Schedule,
        where: { date: req.body.date }
      }],
      // include: [{
      //   model: Appointment,
      //   where: { date: req.body.date }
      // }],
      where: {
        zipCode: req.body.zipCode,
        isVendor: 1
      }
    })
    .then((artists) => {
      res.send(artists) 
    })
  },
  addAppointment: (req, res) => {
    Appointment
      .create({
        userID: req.body.userID,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        houseNumber: req.body.houseNumber,
        streetName: req.body.streetName,
        unitNumber: req.body.unitNumber,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        nail_artist_id: req.body.nail_artist_id,
        nail_artist_first: req.body.nail_artist_first,
        nail_artist_second: req.body.nail_artist_second,
        services_selected: req.body.services_selected
      })
      .then((appointment) => {
        if (appointment) {
          res.send(appointment)
        }
      })
  },
  getAppointments: (req, res) => {
    Appointment
      .find({
        where: {
          email: req.body.email
        }
      })
      .then((appointment) => {
        res.send(appointment)
      })
  },
  updateAppointment: (req, res) => {
    console.log('within update')
    Appointment
      .findOne({where: {email: req.body.email}})
      .then((appointment) => {
        if (appointment) {
          appointment
            .updateAttributes({}) // fill this in
        }
      })
  }
}
