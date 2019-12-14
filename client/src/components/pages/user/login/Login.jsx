import React from "react"
import { Link, Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Input from "../../../parts/Input"

function Login({ changeHandlerMaker, submitHandlerMaker, getCookie, history }) {
    const loggedIn = getCookie("userToken")

    const changeUsernameHandler = changeHandlerMaker("username")
    const changePasswordHandler = changeHandlerMaker("password")

    const submitLoginHandler = submitHandlerMaker("user", "login")


    let loginForm = <form>
        <Input name="username" type="text" changeHandler={changeUsernameHandler} />
        <Input name="password" type="password" changeHandler={changePasswordHandler} />
        <button type="submit" onClick={submitLoginHandler}>Login</button>
        <br />
        <Link to="register">Register</Link>
    </form>

    if (!loggedIn) {
        return <TemplatePage content={loginForm} />
    } else {
        //redirects user to previous page
        history.go(-1)
        return <Redirect to={history.location.pathname} />
    }
}

const initialState = {
    form: {
        username: "",
        password: ""
    }
}

export default withForm(Login, initialState)