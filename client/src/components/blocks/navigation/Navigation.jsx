import React from "react"
import { Link } from "react-router-dom"

import "./navigation.css"

import { parseCookies } from "../../../utils/helpers"

function Navigation(props) {
    const loggedIn = parseCookies().userToken

    return <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Submit</Link>
        <Link to="/my">My reports</Link>
        {!loggedIn ? <Link to="/login">Login</Link>: ""}
        {!loggedIn ? <Link to="/register">Register</Link>: ""}
        {loggedIn ? <Link to="/logout">Logout</Link>: ""}
    </nav>
}

export default Navigation