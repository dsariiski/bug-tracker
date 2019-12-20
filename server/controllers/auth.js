const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require("../config/config")
const helpers = require("../helper")
const User = mongoose.model("User")


module.exports = {
    get: {
        user,
        logout
    },
    post: {
        login,
        register
    }
}

//GET
function user(req, res, next) {
    const { username } = req.params

    User.findOne({ username })
        .then(rezult => {
            console.log(`dRezult: ${rezult}`)
            res.status(200).send(rezult)
        }).catch(err => {
            console.log(`dError: ${err}`)
            next(err)
        })
}

function logout(req, res) {
    res.clearCookie("userToken")
    res.clearCookie("username")
    res.clearCookie("rememberMe")

    res.status(200).send()
}

//POST
function login(req, res) {
    const { username, password } = req.body

    User.findOne({ username })
        .then(user => {
            const passwordMatches = helpers.auth.passwordMatches(password, user.salt, user.password)

            if (!user || !passwordMatches) {
                let errorMsg = "Invalid username or password."
                return res.status(403).send({ errors: [errorMsg] })
            }

            let signedJwt

            if (username.toLowerCase() === "admin") {
                const [a, b] = helpers.auth.encodeToken({ id: user._id }).slice(10)

                signedJwt = a.concat("admin").concat(b)
            } else {
                signedJwt = helpers.auth.encodeToken({ id: user._id })
            }

            res.cookie("userToken", signedJwt)
                .cookie("rememberMe", true)
                .cookie("username", username)
                .send(user)
        }).catch(err => {
            res.status(500).send("500: login went wrong... please try again later.")

            console.warn(err)
        })
}

function register(req, res) {
    const { username, password, repeatPassword } = req.body

    /*
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
    */

    const salt = bcrypt.genSaltSync(config.saltRounds)
    const hashedPassword = helpers.auth.generateHashedPassword(password, salt)

    const userData = {
        username, salt,
        password: hashedPassword
    }

    User.create(userData)
        .then(user => {
            res.send(user)
        }).catch(err => {
            let errors = []
            if (err.name === "MongoError" && err.code === 11000) {
                const errorMsg = "A user with that name already exists. Please choose a different name."
                errors.push(errorMsg)
                // helpers.notification.addErrorRes(errors, res)
            }
            if (err.name === "ValidationError") {
                for (let [key, value] of Object.entries(err.errors)) {
                    errors.push(value)
                }
                // helpers.notification.addErrorRes(errors, res)
            }
            // console.warn(err)

            return errors ? res.status(409).type("json").send({ errors }) : res.status(500).send()
        })
}

