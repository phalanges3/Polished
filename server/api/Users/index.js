const userSchema = require('./user.schema')
const userRoute = require('./user.routes')
const userModel = require('./user.model')

module.exports = {
  userSchema: userSchema,
  userRoute: userRoute,
  userModel: userModel
}
