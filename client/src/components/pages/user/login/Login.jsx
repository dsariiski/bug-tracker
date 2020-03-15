import React from "react"
import { Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"

import Form from "../../../parts/form/Form"

function Login({ changeHandlerMaker, submitHandlerMaker, getCookie, history, getErrors }) {
    const loggedIn = getCookie("userToken")

    const validationType = "user"
    const omitValidations = true

    const changeUsernameHandler = changeHandlerMaker("username", validationType, 100, omitValidations)
    const changePasswordHandler = changeHandlerMaker("password", validationType, 100, omitValidations)

    const submitLoginHandler = submitHandlerMaker("user", "login")

    const fields = [{
        id: "username",
        labelName: "Username",
        type: "text",
        changeHandler: changeUsernameHandler,
        element: "input"
    }, {
        id: "password",
        labelName: "Password",
        type: "password",
        changeHandler: changePasswordHandler,
        element: "input"
    }]

    const loginForm = <Form id="loginForm"
        title="Login:"
        submitName="Login"
        fields={fields}
        submitHandler={submitLoginHandler}
        register={true}
        errors={getErrors()} />

    if (!loggedIn) {
        return <TemplatePage content={loginForm} />
    } else {
        history.push("/")
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