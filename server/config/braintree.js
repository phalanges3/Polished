const braintree = require('braintree')
const cred = require('./braintree.env')
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: `${cred.BT_MERCHANT_ID}`,
  publicKey: `${cred.BT_PUBLIC_KEY}`,
  privateKey: `${cred.BT_PRIVATE_KEY}`
})