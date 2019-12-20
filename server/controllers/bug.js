const mongoose = require('mongoose')
const Bug = mongoose.model('Bug')
const User = mongoose.model("User")

const { decodeToken } = require("../helper").auth

module.exports = {
    get: {
        one,
        all,
        my,
        oneAndUpdate,
        del
    },
    post: {
        create,
        edit
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
    // console.log(req.params.id)
    const { id } = req.params

    //suboptimal - views update should be transferred to client-side
    Bug.findById(id).populate("creator").populate("comments")
        .then(bugInfo => {
            res.status(200).type("json").send(bugInfo)
        }).catch(err => {
            console.log("couldn't retrieve bug info...")
            res.status(404).type("json").send(err.message)
        })
}

function oneAndUpdate(req, res) {
    const { id } = req.params

    Bug.findByIdAndUpdate(id, { $inc: { views: 1 } })
        .then(incrementation => {
            console.log("incremented!")
        }).catch(err => {
            console.log("couldn't update views...")
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

    const creator = userToken.id ? userToken.id : "admin"

    const bugBody = { title, description, status, creator }

    Bug.create(bugBody).then(bug => {
        User.findByIdAndUpdate(creator, { $push: { "bugs": bug } })
            .then(userInfo => {
                const { bugs } = userInfo
            }).catch(err => {
                res.status(401).type("json").send({ message: "couldn't update user" })
            })

        res.status(200).type("json").send({ message: "Bug reported successfully" })
    }).catch(err => {
        if (suppressCastError("create", err)) {
            return
        }
        // console.dir(err)
        res.status(404).type("json").send(err.message)
    })
}

function edit(req, res) {
    const id = req.params.id
    const body = req.body

    Bug.findByIdAndUpdate(id, { ...body })
        .then(newBug => {
            res.status(200).type("json").send({ _id: id, message: "Bug reported successfully" })
        })
        .catch((err) => {
            if (suppressCastError("edit", err)) {
                return
            }
            res.status(404).type("json").send(err.message)
        })
}

function del(req, res) {
    const { id } = req.params

    Bug.findByIdAndDelete(id).then(delInfo => {
        console.log("deleted!")
        // console.log(delInfo)
        res.status(200).send({message: "deleted!"})
    }).catch(err => {
        console.log("couldn't delete bug...")
        res.status(400).send({message: "couldn't delete bug!"})
    })
}

function suppressCastError(origin, err) {
    if (err.name === "CastError" && err.value === 'undefined' && err.path === "_id") {
        console.log(err.message)
        console.log(`[OK] - ${origin}`)
        return true
    }
}