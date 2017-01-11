const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

module.exports = (app, express) => {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cors())
  console.log('direnane', __dirname)
  app.use(express.static(path.join(__dirname, '../../www')))
}

