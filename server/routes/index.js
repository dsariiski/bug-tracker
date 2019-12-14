const rAuth = require('./auth')
const rBug = require("./bug")

module.exports = (app) => {
    // app.get("/", loadBugs)

    app.use("/user", rAuth)

    app.use("/bug", rBug)

    app.use("*", underConstruction)
}

function underConstruction(req, res) {
    // res.render("404")
}