require('./config/db.js')
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
// Middleware
require('./config/middleware.js')(app, express)

app.listen(PORT, () => {
  console.log('SERVER listening on port: ', PORT)
})

module.exports = app
