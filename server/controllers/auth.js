const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require("../config/config")
const helpers = require("../helper")
const User = mongoose.model("User")


module.exports = {
    get: {
        logout
    },
    post: {
        login,
        register
    }
}

function login(req, res) {
    const { username, password } = req.body

    User.findOne({ username })
        .then(user => {
            if (!user) {
                let errorMsg = "User doesn't exist. Please enter a valid username."
                helpers.notification.addErrorRes([errorMsg], res)
                return
            }

            const passwordMatches = helpers.auth.passwordMatches(password, user.salt, user.password)

            if (!passwordMatches) {
                let errorMsg = "Invalid password. Please try again."
                helpers.notification.addErrorRes([errorMsg], res)
                return
            }  
            
            const signedJwt = helpers.auth.encodeToken({id: user._id})
            res.cookie("userToken", signedJwt)
            res.send(user)
        })
        .catch(err => {
            res.status(500).send("500: login went wrong... please try again later.")

            console.warn(err)
        })
}

function register(req, res) {
    const { username, password, repeatPassword } = req.body

    //TODO: fix errors
    if (password !== repeatPassword) {
        const errMsg = "Passwords must match."
        helpers.notification.addErrorRes([errMsg], res)
        return 
    }

    if(!password || !repeatPassword){
        const errMsg = "You must enter a password."
        helpers.notification.addErrorRes([errMsg], res)
        return
    }

    const salt = bcrypt.genSaltSync(config.saltRounds)
    const hashedPassword = helpers.auth.generateHashedPassword(password, salt)
    const userData = {
        username, salt, 
        password: hashedPassword
    }

    User.create(userData)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            let errors = []
            if(err.name === "MongoError" && err.code === 11000){
                const errorMsg =  "A user with that name already exists. Please choose a different name."
                errors.push(errorMsg)
                helpers.notification.addErrorRes(errors, res)
                return
            }
            if(err.name === "ValidationError"){
                for(let [key, value] of Object.entries(err.errors)){
                    errors.push(value)
                }
                helpers.notification.addErrorRes(errors, res)
                return
            }
            console.warn(err)
        })
}

function logout(req, res) {
    res.clearCookie("userToken")
}