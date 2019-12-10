const port = 3001
const eHandlebars = require('express-handlebars')
const express = require('express')
const cookieParser = require("cookie-parser")
const middlewares = require("../helper/middlewares")

module.exports = (app) => {
    if (!app) {
        return app
    }
    this.app = app

    app.use(express.static("static"))

    app.use(express.urlencoded({ extended: true }))

    app.use(cookieParser())

    require("../routes")(app)

    app.listen(port, () => console.log("|app is listening on port 3001|"))
}