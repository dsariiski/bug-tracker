import React from "react"

import { Redirect } from "react-router-dom"

import "./edit.css"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"

import Form from "../../../parts/form/Form"

import bugService from "../../../../utils/bug-service"

function Edit({ changeHandlerMaker, submitHandlerMaker, getFormState,
    updateFormState, getCommon, updateCommon, getCookie, match, history }) {

    const bugId = match.params.id

    //TODO: add authentication
    const loggedIn = getCookie("userToken")

    const changeTitleHandler = changeHandlerMaker("title")
    const changeDescriptionHandler = changeHandlerMaker("description")

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

    const bug = getFormState()
    const views = getCommon("views")

    const heading = <h1>Edit</h1>

    //TODO: add edit auth

    const fields = [{
        id: "title",
        element: "input",
        type: "text",
        value: bug.title,
        changeHandler: changeTitleHandler
    }, {
        id: "description",
        element: "",
        value: bug.description,
        changeHandler: changeDescriptionHandler
    }]

    const editForm = <Form id="editForm"
        title="Update your submission:"
        submitName="Edit"
        fields={fields}
        submitHandler={submitEditHandler} />

    if (loggedIn) {
        return <TemplatePage heading={heading} content={editForm} />
    } else {
        history.go(-1)
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