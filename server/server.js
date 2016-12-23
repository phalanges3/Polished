require('./config/db.config.js')
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./api/routes.main')
// Middleware
require('./config/middleware.js')(app, express)
//routes
app.use('/api', routes) //need func but got object

app.listen(PORT, () => {
  console.log('SERVER listening on port: ', PORT)
})

module.exports = app
