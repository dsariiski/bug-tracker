import React from "react"

import { Redirect } from "react-router-dom"

import "./edit.css"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"

import Input from "../../../parts/Input"

import bugService from "../../../../utils/bug-service"

let firstRender = true

function Edit({ changeHandlerMaker, submitHandlerMaker, getFormState,
    updateFormState, getCommon, updateCommon, getCookie, match, history }) {
    const bugId = match.params.id

    const loggedIn = getCookie("userToken")

    const changeTitleHandler = changeHandlerMaker("title")
    const changeDescriptionHandler = changeHandlerMaker("description")

    const submitEditHandler = submitHandlerMaker("bug", "edit")

    if (firstRender) {
        bugService.get.bug(bugId)
            .then(({ data }) => {
                firstRender = false
                updateCommon("views", data.views)
                updateCommon("id", bugId)

                data.creator = data.creator.username

                const bugData = data

                updateFormState(bugData)
            }).catch(err => {
                console.log("something went wrong")
                console.dir(err)
            })
    }

    const bug = getFormState()
    const views = getCommon("views")

    const heading = <h1>Edit</h1>

    //TODO: add edit auth

    let editForm = <form>
        <Input name="title" type="text" changeHandler={changeTitleHandler} value={bug.title} />
        <label htmlFor="description">
            Description:
            <textarea id="description" value={bug.description} onChange={changeDescriptionHandler} />
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