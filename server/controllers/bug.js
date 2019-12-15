const mongoose = require('mongoose')
const Bug = mongoose.model('Bug')
const User = mongoose.model("User")

const { decodeToken } = require("../helper").auth

module.exports = {
    get: {
        one,
        all,
        my
    },
    post: {
        create,
        edit,
        del
    }
}

function all(req, res) {
    Bug.find()
        .populate('creator')
        .then(bugz => res.status(200).type("json").send(bugz))
        .catch((err) => {
            if (suppressCastError("all", err)) {
                return
            }
            console.dir(err)
            res.status(404).type("json").send(err.message)
        })
}

function one(req, res) {
    //TODO: fix cast error
    const { id } = req.params

    //suboptimal - views update should be transferred to client-side
    Bug.findByIdAndUpdate(id, { $inc: { "views": 1 } })
        .populate('creator')
        .then(bug => {
            // bug.creator = bug.creator.username

            res.status(200).type("json").send(bug)
        })
        .catch((err) => {
            if (suppressCastError("one[GET]", err)) {
                return
            }
            console.log("one")
            console.dir(err)
            res.status(404).type("json").send(err.message)
        })
}

function my(req, res) {
    const jwt = req.cookies.userToken
    const userToken = decodeToken(jwt)

    const userId = userToken.id

    Bug.find({ creator: userId })
        .populate("creator")
        .then(bugs => {
            console.dir(bugs)
            res.status(200).type("json").send(bugs)
        }).catch(err => {
            console.log("ne66to sa precaka..")
        })
}

function create(req, res) {
    const { title, description, status } = req.body

    const jwt = req.cookies.userToken
    const userToken = decodeToken(jwt)

    const creator = userToken.id ? userToken.id : undefined

    const bugBody = { title, description, status, creator }

    Bug.create(bugBody).then(bug => {
        User.findByIdAndUpdate(creator, { $push: { "bugs": bug } })
            .then(userInfo => {
                const { bugs } = userInfo
            }).catch(err => {
                //TODO: return to front-end
                console.log("couldn't update user")
            })

        res.status(200).type("json").send({ message: "Bug reported successfully" })
    }).catch(err => {
        if (suppressCastError("create", err)) {
            return
        }
        console.dir(err)
        res.status(404).type("json").send(err.message)
    })
}


function edit(req, res) {
    const id = req.params.id
    const body = req.body

    Bug.findByIdAndUpdate(id, { ...body })
        .then(newBug => {
            // console.dir(newBug)
            res.status(200).type("json").send({ message: "Bug reported successfully" })
        })
        .catch((err) => {
            if (suppressCastError("edit", err)) {
                return
            }
            console.dir(err)
            res.status(404).type("json").send(err.message)
        })
}

function del(req, res) {
    //TODO
}

function suppressCastError(origin, err) {
    if (err.name === "CastError" && err.value === 'undefined' && err.path === "_id") {
        console.log(`[OK] - ${origin}`)
        return true
    }
}