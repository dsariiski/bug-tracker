import React from "react"

import { Redirect } from "react-router-dom"

import "./edit.css"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"

import Form from "../../../parts/form/Form"

import bugService from "../../../../utils/service/bug-service"

function Edit({ changeHandlerMaker, submitHandlerMaker, getFormState,
    updateFormState, getCommon, updateCommon, getCookie, match, history,
    getErrors }) {

    const bugId = match.params.id

    const validationType = "other"

    const loggedIn = getCookie("userToken")

    const changeTitleHandler = changeHandlerMaker("title", validationType, 0)
    const changeDescriptionHandler = changeHandlerMaker("description", validationType, 0)

    const submitEditHandler = submitHandlerMaker("bug", "edit")

    let firstRender = getCommon("firstRender")

    if (firstRender) {
        bugService.get.bug(bugId)
            .then(({ data }) => {
                updateCommon("firstRender", false)
                updateCommon("views", data.views)
                updateCommon("id", bugId)

                data.creator = data.creator.username

                const bugData = data

                updateFormState(bugData)
            }).catch(err => {
                console.log("couldn't fetch edit data: ")
                console.dir(err)
            })
    }

    const heading = <h1>Edit</h1>

    const fields = [{
        id: "title",
        element: "input",
        type: "text",
        valueGetter: getFormState,
        changeHandler: changeTitleHandler
    }, {
        id: "description",
        element: "",
        valueGetter: getFormState,
        changeHandler: changeDescriptionHandler
    }]

    const editForm = <Form id="editForm"
        title="Update your submission:"
        submitName="Edit"
        fields={fields}
        submitHandler={submitEditHandler} 
        errors={getErrors()}/>

    if (loggedIn) {
        return <TemplatePage heading={heading} content={editForm} />
    } else {
        history.push("/")
        return <Redirect to={history.location.pathname} />
    }
}

const initialState = {
    common: { views: "" },
    form: {
        title: "",
        description: "",
        creator: "",
        status: ""
    }
}

export default withForm(Edit, initialState)