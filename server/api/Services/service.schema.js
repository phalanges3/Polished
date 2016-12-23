const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')
const User = require('../Users/user.schema')

const Service = db.define('service', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'sea salt scrub'
  }
})

// relationships
Service.belongsToMany(User, {through: 'UsersServices', foreignKey: 'userId'})
User.belongsToMany(Service, {through: 'UsersServices',  foreignKey: 'serviceId'})

Service.sync().then(() => {
  console.log('SERVICE table successfully created.')
})

module.exports = Service