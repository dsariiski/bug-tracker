const mongoose = require('mongoose')
const config = require("./config")
mongoose.Promise = Promise

module.exports = () => {
    //require models..
    require("../models/Comment")
    require("../models/User")
    require('../models/Bug')

    //for internal mongoose use
    mongoose.set('useCreateIndex', true)

    return mongoose.connect(config.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}