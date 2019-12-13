import React from "react"

import { Redirect } from "react-router-dom"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Input from "../../../parts/Input"

// import { parseCookies } from "../../../../utils/helpers"

function Create(props) {
    const { changeHandlerMaker, submitHandlerMaker, history, getCookie } = props

    const titleChangeHandler = changeHandlerMaker("title")
    const descriptionChangeHandler = changeHandlerMaker("description")

    const submitBugHandler = submitHandlerMaker("bug", "create")

    const loggedIn = getCookie("userToken")

    let createForm = <form>
        <Input name="title" type="text" changeHandler={titleChangeHandler} />
        <label htmlFor="description">
            Description:
            <textarea id="description" onChange={descriptionChangeHandler} />
        </label>
        <br />
        <button type="submit" onClick={submitBugHandler}>Add</button>
    </form>

    if (loggedIn) {
        return <TemplatePage content={createForm} />
    } else {
        history.push("/")
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