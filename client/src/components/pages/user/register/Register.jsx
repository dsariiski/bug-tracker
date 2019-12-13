import React from "react"
import { Link } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Input from "../../../parts/Input"

function Register({ changeHandlerMaker, submitHandlerMaker }) {
    const changeUsernameHandler = changeHandlerMaker("username")
    const changePasswordHandler = changeHandlerMaker("password")
    const changeRepeatPasswordHandler = changeHandlerMaker("repeatPassword")

    const submitRegisterHandler = submitHandlerMaker("register")

    let content = <form>
        <Input name="username" type="text" changeHandler={changeUsernameHandler} />
        <Input name="password" type="password" changeHandler={changePasswordHandler} />
        <Input name="repeatPassword" type="password" changeHandler={changeRepeatPasswordHandler} />
        <button type="submit" onClick={submitRegisterHandler}>Register</button>
        <br />
        <Link to="login">Login</Link>
    </form>

    return (
        <TemplatePage content={content} />
    )
}

const initialState = {
    form: {
        username: "",
        password: "",
        repeatPassword: ""
    }
}

export default withForm(Register, initialState)