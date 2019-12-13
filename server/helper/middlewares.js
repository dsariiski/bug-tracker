const helpers = require('./index')

function isLoggedIn(req, res, next){
    const jwt = req.cookies.userToken

    let userData = helpers.auth.decodeToken(jwt)

    if(!userData.id){
        return res.redirect("/user/login")
    }

    return next()
}

module.exports = {
    isLoggedIn
}
