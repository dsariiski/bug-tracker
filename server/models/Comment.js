const mongoose = require('mongoose')

const commentSchema = {
    comment: {type: mongoose.SchemaTypes.String, required: [true, "Comment is required!"]},
    author: {type: mongoose.SchemaTypes.String}
}

module.exports = mongoose.model('Comment', commentSchema)