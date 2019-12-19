const express = require('express')
const rBug = express.Router()
const controllers = require("../controllers")
const middlewares = require("../helper/middlewares")

rBug.get("/", controllers.bug.get.all)

rBug.get("/my", controllers.bug.get.my)

rBug.get("/:id", controllers.bug.get.one)

rBug.get("/update/:id", controllers.bug.get.oneAndUpdate)

rBug.get("/delete/:id", controllers.bug.get.del)

// rBug.use(middlewares.isLoggedIn)

rBug.post('/create', controllers.bug.post.create)

rBug.post('/edit/:id', controllers.bug.post.edit)

rBug.post("/comment/:id", controllers.comment.post.comment)

module.exports = rBug