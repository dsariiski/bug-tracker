import React from "react"
import { Link } from "react-router-dom"

import "./navigation.css"

import { parseCookies } from "../../../utils/helpers"

function Navigation(props) {
    const loggedIn = parseCookies().userToken

    return <nav className="menu">
        <ul className="list">
            <li className="group">
                <Link to="/" className="link"><img src="http://localhost:3000/logo.svg" alt="Home" /></Link>
            </li>
            {/* <li className="group">
                    <Link to="/" className="link">Home</Link>
                </li> */}
            <li className="group">
                <Link to="/create" className="link">Submit</Link>
            </li>
            <li className="group" >
                <Link to="/my" className="link">My reports</Link>
            </li>
            {!loggedIn ?
                <li className="group">
                    <Link to="/login" className="link">Login</Link>
                </li> : ""}

            {!loggedIn ?
                <li className="group">
                    <Link to="/register" className="link">Register</Link>
                </li> : ""}

            {loggedIn ?
                <li className="group">
                    {loggedIn ? <Link to="/logout" className="link">Logout</Link> : ""}
                </li> : ""}
        </ul>
    </nav>
}

export default Navigation