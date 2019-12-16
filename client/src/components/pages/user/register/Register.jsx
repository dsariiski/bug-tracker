import React from "react"
import { Link, Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Form from "../../../parts/form/Form"

import { parseCookies } from "../../../../utils/helpers"

function Register({ changeHandlerMaker, submitHandlerMaker, history }) {
    const loggedIn = parseCookies().userToken

    const changeUsernameHandler = changeHandlerMaker("username")
    const changePasswordHandler = changeHandlerMaker("password")
    const changeRepeatPasswordHandler = changeHandlerMaker("repeatPassword")

    const submitRegisterHandler = submitHandlerMaker("user", "register")

    const fields = [{
        id: "username",
        type: "text",
        changeHandler: changeUsernameHandler,
        element: "input"
    }, {
        id: "password",
        type: "password",
        changeHandler: changePasswordHandler,
        element: "input"
    }, {
        id: "repeatPassword",
        type: "password",
        changeHandler: changeRepeatPasswordHandler,
        element: "input"
    }]

    const registerForm = <Form id="registerForm"
        title="Register:"
        submitName="Register"
        fields={fields}
        submitHandler={submitRegisterHandler}
        login={true} />

    if (!loggedIn) {
        return <TemplatePage content={registerForm} />
    } else {
        //redirects user to previous page
        history.go(-1)
        return <Redirect to={history.location.pathname} />
    }
}

const initialState = {
    form: {
        username: "",
        password: "",
        repeatPassword: ""
    }
}

export default withForm(Register, initialState)