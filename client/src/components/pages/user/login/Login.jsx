import React from "react"
import { Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"

import Form from "../../../parts/form/Form"

function Login({ changeHandlerMaker, submitHandlerMaker, getCookie, history }) {
    const loggedIn = getCookie("userToken")

    const changeUsernameHandler = changeHandlerMaker("username")
    const changePasswordHandler = changeHandlerMaker("password")

    const submitLoginHandler = submitHandlerMaker("user", "login")

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
    }]

    const loginForm = <Form id="loginForm"
        title="Login:"
        submitName="Login"
        fields={fields}
        submitHandler={submitLoginHandler}
        register={true} />

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