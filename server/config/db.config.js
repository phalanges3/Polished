const Sequelize = require('sequelize')

// Please create a credential.json file with your username and password for your cloud DB.
// Refer to sampleCredentials.json
const creds = require('./credentials')

// Database connection
const DBConnection = new Sequelize(creds.DBurl)

console.log('in db file')

// Connection testing
DBConnection
    .authenticate()
    .then(() => {
      console.log('DB connection successful')
    })
    .catch((err) => {
      console.log('DB connection ERROR: ', err)
    })

module.exports = DBConnection

// require models here if needed
