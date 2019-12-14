const mongoose = require('mongoose')

const bugSchema = {
    title: { type: mongoose.SchemaTypes.String, required: [true, "Title is required!"] },
    description: { type: mongoose.SchemaTypes.String, required: [true, "Description is required!"] },
    status: { type: mongoose.SchemaTypes.String, enum: ['fixed', 'confirmed', 'pending'], default: "pending" },
    views: { type: mongoose.SchemaTypes.Number, default: 1 },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
}

module.exports = mongoose.model('Bug', bugSchema)