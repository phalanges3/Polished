require('./config/db.config.js')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./api/routes.main')

// Middleware
require('./config/middleware.js')(app, express)
// routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log('SERVER listening on port: ', PORT)
})

const braintree = require('braintree')
const cred = require('./config/braintree.env')
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: `${cred.BT_MERCHANT_ID}`,
  publicKey: `${cred.BT_PUBLIC_KEY}`,
  privateKey: `${cred.BT_PRIVATE_KEY}`
})
app.get('/client_token', function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken)
  })
})
app.post('/checkout', function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce
  // Use payment method nonce here
})

module.exports = app

// Do I need to serve static files from front-end or ionic does this auto?
