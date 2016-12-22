const User = require('./user.schema')



exports.get = (req, res)=> {
    User
        .findOne()
},

