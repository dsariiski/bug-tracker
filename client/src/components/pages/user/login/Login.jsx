import React from "react"
import {Link} from "react-router-dom"

import withForm from "../../../hoc/withForm"
import Input from "../../../parts/Input"

function Login(props){
    const {changeHandlerMaker, submitHandlerMaker} = props

    const changeUsernameHandler = changeHandlerMaker("username")
    const changePasswordHandler = changeHandlerMaker("password")

    const submitLoginHandler = submitHandlerMaker("login")

    return (
        <form>
            <Input name="username" type="text" changeHandler={changeUsernameHandler} />
            <Input name="password" type="password" changeHandler={changePasswordHandler} />
            <button type="submit" onClick={submitLoginHandler}>Login</button>
            <br />
            <Link to="register">Register</Link>
        </form>
    )
}

const initialState = {
    username: "",
    password: ""
}

export default withForm(Login, initialState)