require('./config/db.config.js')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./api/routes.main')
const pg = require('pg')
const path = require('path')

// Middleware
require('./config/middleware.js')(app, express)
// routes
app.use('/api', routes)

app.use(express.static(path.join(__dirname, 'www')))

app.listen(PORT, () => {
  console.log('SERVER listening on port: ', PORT)
})

module.exports = app
