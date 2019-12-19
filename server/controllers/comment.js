const mongoose = require('mongoose')
const Bug = mongoose.model('Bug')
const User = mongoose.model("User")
const Comment = mongoose.model("Comment")

module.exports = {
    get: {

    },
    post: {
        comment
    }
}

function comment(req, res) {
    const { username } = req.cookies

    const { bugId, comment } = req.body

    const commentBody = comment

    create(commentBody, username)
        .then(comment => {
            Bug.findByIdAndUpdate(bugId, { $push: { comments: comment._id } })
                .then(bugWithComment => {
                    console.log("comment created!")
                    res.status(200).type("json").send({ message: "Bug reported successfully" })
                }).catch(err => {
                    console.log("couldn't comment...")
                    return res.status(404).type("json").send(err.message)
                })
        }).catch(err => {
            console.log("couldn't create comment.. stack: \n")
            console.dir(err)
        })
}

function create(comment, author) {
    const commentBody = { comment, author }

    return Comment.create(commentBody)
}