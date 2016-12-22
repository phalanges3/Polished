const userSchema = require('./user.schema')
const userController = require('./user.controller')
const userRoute = require('./user.routes')
const userModel = require('./user.model')

module.exports = {
  userSchema: userSchema,
  userController: userController,
  userRoute: userRoute,
  userModel, userModel
}

// Review.belongsTo(User)
// User.hasMany(Review)


//sync all tables once