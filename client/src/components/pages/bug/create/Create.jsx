import React from "react"

import { Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Form from "../../../parts/form/Form"

function Create(props) {
    const { changeHandlerMaker, submitHandlerMaker, getCookie, getErrors, history } = props

    const validationType = "other"

    const titleChangeHandler = changeHandlerMaker("title", validationType)
    const descriptionChangeHandler = changeHandlerMaker("description", validationType)

    const submitBugHandler = submitHandlerMaker("bug", "create")

    const loggedIn = getCookie("userToken")

    const fields = [{
        id: "title",
        element: "input",
        type: "text",
        value: "",
        changeHandler: titleChangeHandler
    }, {
        id: "description",
        element: "",
        value: "",
        changeHandler: descriptionChangeHandler
    }]

    const createForm = <Form id="createForm"
        title="Submit a bug"
        submitName="Create"
        submitHandler={submitBugHandler}
        fields={fields}
        errors={getErrors()}
    />

    if (loggedIn) {
        return <TemplatePage content={createForm} />
    } else {
        history.push("/bug/create")
        return <Redirect to="/login" />
    }
}

const initialState = {
    form: {
        title: "",
        description: ""
    }
}

export default withForm(Create, initialState)