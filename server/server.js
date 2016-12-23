require('./config/db.config.js')
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./api/routes.main')
// Middleware
require('./config/middleware.js')(app, express)
//routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log('SERVER listening on port: ', PORT)
})

module.exports = app

// Do I need to serve static files from front-end or ionic does this auto?
