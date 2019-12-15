import React from "react"
import { Link, Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Input from "../../../parts/Input"

import { parseCookies } from "../../../../utils/helpers"

function Register({ changeHandlerMaker, submitHandlerMaker, history }) {
    const loggedIn = parseCookies().userToken

    const changeUsernameHandler = changeHandlerMaker("username")
    const changePasswordHandler = changeHandlerMaker("password")
    const changeRepeatPasswordHandler = changeHandlerMaker("repeatPassword")

    const submitRegisterHandler = submitHandlerMaker("user", "register")

    let content = <form>
        <Input name="username" type="text" changeHandler={changeUsernameHandler} />
        <Input name="password" type="password" changeHandler={changePasswordHandler} />
        <Input name="repeatPassword" type="password" changeHandler={changeRepeatPasswordHandler} />
        <button type="submit" onClick={submitRegisterHandler}>Register</button>
        <br />
        <Link to="login">Login</Link>
    </form>

    if (!loggedIn) {
        return <TemplatePage content={content} />
    } else {
        //redirects user to previous page
        history.go(-1)
        return <Redirect to={history.location.pathname} />
    }

    /*
    return (
        <TemplatePage content={content} />
    )
    */
}

const initialState = {
    form: {
        username: "",
        password: "",
        repeatPassword: ""
    }
}

export default withForm(Register, initialState)