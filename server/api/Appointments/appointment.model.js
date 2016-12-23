const Appointment = require('./appointment.schema')

module.exports = {

  addAppointment: (req, res) => {
    Appointment
      .create({}) //fill this in
      .then((appointment) => {
        if (appointment)
          res.send(appointment)
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