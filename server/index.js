const express = require('express')

require("./config/db")().then((db) => {
    console.log("|database is ready|")
    let app = express()

    require("./config/express")(app)
}).catch(err => {
    console.warn("|||database couldn't power on..|||")
    console.warn(err)
})