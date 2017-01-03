const Appointment = require('./appointment.schema')
const User = require('../users/user.schema')
const Schedule = require('../schedule/schedule.schema')
const Review = require('../reviews/review.schema')

module.exports = {
  findAvailableArtists: (req, res) => {
    var results = []
    User.findAll({
      include: [{
        model: Schedule,
        where: { day: req.body.day }
      },
      {
        model: Appointment,
          // where: { $or: [{date: req.body.date, start: {$ne: req.body.time}}, {date: {$ne:req.body.date}}]},
        where: {date: {$ne: req.body.date}}
      },
      {
        model: Review
      }],
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
        userId: req.body.userId,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        houseNumber: req.body.houseNumber,
        streetName: req.body.streetName,
        unitNumber: req.body.unitNumber,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        clientId: req.body.clientId,
        nail_artist_first: req.body.nail_artist_first,
        nail_artist_second: req.body.nail_artist_second,
        services_selected: req.body.services_selected,
        addOns: req.body.addOns,
        total: req.body.total
      })
      .then((appointment) => {
        if (appointment) {
          res.send(appointment)
        }
      })
  },
  getAppointments: (req, res) => {
    console.log('line 51 appt model', req.body)
    Appointment
      .findAll({where: {userId: req.body.userId}})
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
