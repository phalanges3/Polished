require('./config/db.config.js')
const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const HTTP_PORT = process.env.PORT || 3000
const HTTPS_PORT = 443
const routes = require('./api/routes.main')
const fs = require('fs')

// Middleware
require('./config/middleware.js')(app, express)

// Routes
app.use('/api', routes)

// HTTPS
let secureServer = https.createServer({
    key: fs.readFileSync('./server/config/private.key'),
    cert: fs.readFileSync('./server/config/certificate.pem')
  }, app)
  .listen(HTTPS_PORT,  () => {
    console.log('Secure Server listening on port: ' + HTTPS_PORT)
})

// HTTP

var insecureServer = http.createServer(app).listen(HTTP_PORT, () => {
  console.log('Insecure Server listening on port: ' + HTTP_PORT)
})

// app.listen(PORT, () => {
//   console.log('SERVER listening on port: ', PORT)
// })

module.exports = app
