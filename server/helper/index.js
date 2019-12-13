const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require("../config/config")

module.exports = {
    auth: {
        generateHashedPassword,
        passwordMatches,
        encodeToken,
        decodeToken
    },
    notification: {
        addErrorRes
    }
}

//auth

function generateHashedPassword(password, salt) {
    const hashedPassword = bcrypt.hashSync(password, salt)

    return hashedPassword
}

function passwordMatches(password, salt, hashedPassword) {
    return bcrypt.hashSync(password, salt) === hashedPassword
}

function encodeToken(data){
    return jwt.sign(data, config.secret)
}

function decodeToken(jibberishToken) {
    try {
        return jwt.verify(jibberishToken, config.secret)
    }catch (error){
        if(error.name === "JsonWebTokenError"){
            return false
        }else {
            console.warn("deep jwt error:")
            console.warn(error)
            return false
        }
    }
}

//notification

function addErrorRes (errors, res){
    res.locals.messages = {}
    res.locals.messages.errors = errors
}
