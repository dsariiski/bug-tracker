const mongoose = require('mongoose')
const config = require("./config")
mongoose.Promise = Promise

module.exports = () => {
    //require models..
    require("../models/User")

    return mongoose.connect(config.connectionString)
}