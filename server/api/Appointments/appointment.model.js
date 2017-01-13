const Appointment = require('./appointment.schema')
const User = require('../Users/user.schema')
const Schedule = require('../Schedule/schedule.schema')

module.exports = {
  findAvailableArtists: (req, res) => {
    User.findAll({
      include: [{
        model: Schedule,
        where: { day: req.body.day }
      },
      {
        model: Appointment
        //   where: { $or: [{date: req.body.date, start: {$ne: req.body.time}}, {date: {$ne:req.body.date}}]},
        // where: {date: req.body.date, start: {$ne: req.body.time}}
      }],
      where: {
        zipCode: req.body.zipCode,
        isVendor: 1
      }
    })
    .then((artists) => {
      var filtered = []
      // console.log(new Date())
      var results = JSON.parse(JSON.stringify(artists))
      for (var i = 0; i < results.length; i++) {
        results[i].flag = true
        results[i].general_rating = (results[i].general_rating / 100)
        console.log('general rating / 100 ', results[i].general_rating)
        if (results[i].appointments.length === 0) {
          filtered.push(results[i])
        } else {
          for (var j = 0; j < results[i].appointments.length; j++) {
            if (results[i].appointments[j].start === req.body.time && results[i].appointments[j].date === req.body.date) {
              results[i].flag = false
              // console.log("flag", results[i].flag, results[i].firstName )
            }
            // console.log("flag", results[i].flag, results[i].firstName )
          }
          if (results[i].flag) {
            filtered.push(results[i])
          }
        }
      }
      return filtered
    })
      .then(filteredRes => {
        // console.log("filteredRes", filteredRes, "length", filteredRes.length)
        res.send(filteredRes)
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
        nail_artist_username: req.body.nail_artist_username,
        nail_artist_image: req.body.nail_artist_image,
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
  clientAppointments: (req, res) => {
    console.log('line 87 appt model', req.body)
    Appointment
      .findAll({where: {clientId: req.body.clientId}})
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
  },
  deleteAppointment: (req, res) => {
    Appointment
      .findOne({where: {id: req.body.id}})
      .then((appointment) => {
        console.log('user: ', appointment)
        if (appointment) {
          appointment
            .destroy()
        }
        res.send(appointment)
      })
  }
}
