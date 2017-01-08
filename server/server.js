require('./config/db.config.js')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./api/routes.main')
const pg = require('pg')



// Middleware
require('./config/middleware.js')(app, express)
// routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log('SERVER listening on port: ', PORT)
})

module.exports = app
