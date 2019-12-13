import React from "react"

import { Redirect } from "react-router-dom"

import userService from "../../../../utils/user-service"

function Logout(props) {
    userService.get.logout().then(loggedOut => {
        console.log(loggedOut)
        props.history.push("/")
    }).catch(err => {
        console.log("couldn't log out")
    })

    return <Redirect to="/" />
}

export default Logout