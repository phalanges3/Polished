const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')

const Service = db.define('service', {
  manicure: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  pedicure: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  reflexology: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  acrylics: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  gel_polish: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  nail_art: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  sea_salt: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Service
