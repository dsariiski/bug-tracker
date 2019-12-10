const mongoose = require('mongoose')
const config = require("./config")
mongoose.Promise = Promise

module.exports = () => {
    //require models..
    require("../models/User")

    //for internal mongoose use
    mongoose.set('useCreateIndex', true)

    return mongoose.connect(config.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}