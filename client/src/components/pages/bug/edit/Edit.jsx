import React from "react"

import "./edit.css"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"

import Input from "../../../parts/Input"

import bugService from "../../../../utils/bug-service"

let firstRender = true

function Edit({ changeHandlerMaker, submitHandlerMaker, getFormState, updateFormState, getCommon, updateCommon, match }) {
    let bugId = match.params.id

    const changeTitleHandler = changeHandlerMaker("title")
    const changeDescriptionHandler = changeHandlerMaker("description")

    const submitEditHandler = submitHandlerMaker("bug", "edit")

    if (firstRender) {
        bugService.get.bug(bugId)
            .then(({ data }) => {
                firstRender = false
                updateCommon("views", data.views)
                updateCommon("id", bugId)

                const bugData = data

                updateFormState(bugData)
            }).catch(err => {
                console.log("не66то съ прицака..")
                console.dir(err)
            })
    }

    const bug = getFormState()
    const views = getCommon("views")

    const heading = <h1>Edit</h1>

    let editForm = <form className="bug">
        <Input name="title" type="text" changeHandler={changeTitleHandler} value={bug.title} />
        <label htmlFor="description">
            Description:
            <textarea id="description" onChange={changeDescriptionHandler} />
        </label>
        <br />
        <span className="views">Views: {views}</span>
        <br />
        <span>Status: {bug.status}</span>
        <br />
        <span>Creator: {bug.creator}</span>
        <br />
        <button type="submit" onClick={submitEditHandler}>Edit</button>
    </form>

    return <TemplatePage heading={heading} content={editForm} />
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