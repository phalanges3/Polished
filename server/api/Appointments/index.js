const appointmentSchema = require('./appointment.schema')
const appointmentRoute = require('./appointment.routes')
const appointmentModel = require('./appointment.model')

module.exports = {
  appointmentSchema: appointmentSchema,
  appointmentRoute: appointmentRoute,
  appointmentModel: appointmentModel
}