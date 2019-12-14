import React from "react"

import { Redirect } from "react-router-dom"

import userService from "../../../../utils/user-service"

import { parseCookies } from "../../../../utils/helpers"

function Logout({ history }) {
    const loggedIn = parseCookies().userToken

    if (loggedIn) {
        userService.get.logout().then(loggedOut => {
            console.log(loggedOut)
            history.push("/")
        }).catch(err => {
            console.log("couldn't log out")
        })

        return <Redirect to="/" />
    }

    return <Redirect to="/" />
}

export default Logout