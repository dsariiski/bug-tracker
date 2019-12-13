import React from "react"
import { Link } from "react-router-dom"

import "./navigation.css"

function Navigation(props) {
    return <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Submit</Link>
        <Link to="/reports">My reports</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </nav>
}

export default Navigation