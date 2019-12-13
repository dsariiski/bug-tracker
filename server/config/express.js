const port = 3001
const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require('cors')

module.exports = (app) => {
    if (!app) {
        return app
    }
    this.app = app

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))

    app.use(express.static("static"))

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use(cookieParser())

    require("../routes")(app)

    app.listen(port, () => console.log(`|app is listening on port ${port}|`))
}