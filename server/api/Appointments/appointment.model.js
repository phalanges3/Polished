const Appointment = require('./appointment.schema')
const User = require('../users/user.schema')
const Schedule =  require('../Schedule/schedule.schema')

module.exports = {
  findAvailableArtists: (req, res) => {
    var results =  []
    User.findAll({
      // include: [{
      //   model: Schedule
      // }],
      where: {
        zipCode: req.body.zipCode
      }
    })
    .then((artist) => {
      //result is artists in zip
      // for(var i = 0; i <  artist.length; i++){
      //   console.log("artist line 16",artist[i].dataValues.id)
      //   Schedule.findAll({
      //     where: {
      //       userID: artist[i].dataValues.id,
      //       date: req.body.date
      //     }
      //   })
      //   .then((result) =>  {
      //     //result is one artist's availability start/end for date of appointment
      //       // if(result[0].start < req.body.time && result[0].end > req.body.time){
      //       //   results.push(result.userID)
      //       // }
      //       console.log('made it to artist scchedule')
      //   })
      // }
      res.send(artist)
    })
  },
  addAppointment: (req, res) => {
    Appointment
      .create({
        userID : req.body.userID,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        houseNumber: req.body.houseNumber,
        streetName: req.body.streetName,
        unitNumber: req.body.unitNumber,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        nail_artist_id: req.body.artistID,
        nail_artist_first: req.body.artistFirst,
        nail_artist_second:  req.body.artistLast,
        services_selected: req.body.servicesSelected
      }) //fill this in
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
