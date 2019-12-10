const express = require('express')
const rBug = express.Router()
const controllers = require("../controllers")

rBug.post('/create', controllers.bug.post.create)

rBug.post('/edit', controllers.bug.post.edit)

module.exports = rBug