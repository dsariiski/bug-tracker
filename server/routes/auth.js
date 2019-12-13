const express = require('express')
const rAuth = express.Router()
const controllers = require("../controllers")


rAuth.post("/register", controllers.auth.post.register)

rAuth.post("/login", controllers.auth.post.login)

rAuth.get("/logout", controllers.auth.get.logout)

rAuth.get("/:username", controllers.auth.get.user)

module.exports = rAuth