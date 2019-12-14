const mongoose = require('mongoose')

const userSchema = {
    username: { type: mongoose.Schema.Types.String, required: [true, "Username is required"], unique: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: [true, "Password is required"] },
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }]
}

module.exports = mongoose.model("User", userSchema)