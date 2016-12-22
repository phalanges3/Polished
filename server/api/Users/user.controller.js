const userModel = require('./user.model')

exports.get = (req, res) => {
    userModel.get(req.query, res)
    res.send(req.query)
}

exports.post = (req, res) => {
  userModel.post(req.body, res)
  res.send(req.body)
}
