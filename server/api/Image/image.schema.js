const Sequelize = require('sequelize')
const db = require('../../config/db.config.js')

const Image = db.define('image', {
    image_url: {
        type: Sequelize.STRING
    }
})

module.exports = Image