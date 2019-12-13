const express = require('express')
const rBug = express.Router()
const controllers = require("../controllers")
const middlewares = require("../helper/middlewares")

rBug.get("/", controllers.bug.get.all)

rBug.get("/:id", controllers.bug.get.one)

// rBug.use(middlewares.isLoggedIn)

rBug.post('/create', controllers.bug.post.create)

rBug.post('/edit/:id', controllers.bug.post.edit)

module.exports = rBug