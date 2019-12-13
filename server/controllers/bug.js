const mongoose = require('mongoose')
const Bug = mongoose.model('Bug')

module.exports = {
    get: {
        one,
        all
    },
    post: {
        create,
        edit,
        del
    }
}

function all(req, res) {
    Bug.find()
        .then(bugz => res.status(200).type("json").send(bugz))
        .catch((err) => {
            if(suppressCastError("all", err)){
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
        .then(bug => res.status(200).type("json").send(bug))
        .catch((err) => {
            if(suppressCastError("one[GET]", err)){
                return
            }
            console.dir(err)
            res.status(404).type("json").send(err.message)
        })
}

function create(req, res) {
    const { title, description, status } = req.body

    const bugBody = { title, description, status }

    Bug.create(bugBody).then(bug => {
        res.status(200).type("json").send({ message: "Bug reported successfully" })
    }).catch((err) => {
        if(suppressCastError("create", err)){
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
        .then(newBug => console.dir(newBug))
        .catch((err) => {
            if(suppressCastError("edit", err)){
                return
            }
            console.dir(err)
            res.status(404).type("json").send(err.message)
        })

}

function del(req, res) {
    //TODO
}

function suppressCastError(origin, err){
    if(err.name==="CastError" && err.value==='undefined' && err.path==="_id"){
        console.log(`[OK] - ${origin}`)
        return true
    }
}