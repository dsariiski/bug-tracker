import React from "react"
import { Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Form from "../../../parts/form/Form"

import { parseCookies } from "../../../../utils/helpers"

function Register({ changeHandlerMaker, submitHandlerMaker, history, getErrors }) {
    const loggedIn = parseCookies().userToken

    const validationType = "user"

    const changeUsernameHandler = changeHandlerMaker("username", validationType)
    const changePasswordHandler = changeHandlerMaker("password", validationType)
    const changeRepeatPasswordHandler = changeHandlerMaker("repeatPassword", validationType)

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
        login={true}
        errors={getErrors()}/>

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