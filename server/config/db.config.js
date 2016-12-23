const Sequelize = require('sequelize')

// Please create a credential.json file with your username and password for your cloud DB.
// Refer to sampleCredentials.json
const creds = require('./credentials')

const DBurl = `postgres://${creds.username}:${creds.password}@elmer.db.elephantsql.com:5432/dbgocjhk`

// Database connection
const DBConnection = new Sequelize(DBurl)

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
