const Sequelize = require('sequelize')

// Please create a credential.json file with your username and password for your cloud DB.
// Refer to sampleCredentials.json
// const creds = require('./credentials')

// Database connection
const DBConnection = new Sequelize('postgres://pmbwfnib:Mkxsvk0pwQLPkxsCTf_mSvoO4fy7QwXW@elmer.db.elephantsql.com:5432/pmbwfnib')

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

