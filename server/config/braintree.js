const express = require('express')
const router = express.Router()
const braintree = require('braintree')
const cred = require('./braintree.env')

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'k3fb9p88pvbfjfg9',
  publicKey: '6q9ydnbwfxdg9j8g',
  privateKey: '33be1c201f3019eebfcdd48be67cbe79'
})

router.get('/client_token', function (req, res) {
  console.log('withinpayment')
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken)
  })
})

router.post('/checkouts', function (req, res) {
  var transactionErrors
  var amount = req.body.amount // In production you should not take amounts directly from clients
  var nonce = req.body.payment_method_nonce

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (result.success || result.transaction) {
      res.json('you paid')
    } else {
      transactionErrors = result.errors.deepErrors()
      res.json('you paid')
    }
  })
})

module.exports = router
