import React from "react"

import TemplatePage from "../../../hoc/TemplatePage"
import withForm from "../../../hoc/withForm"
import Input from "../../../parts/Input"

function Create({ changeHandlerMaker, submitHandlerMaker }) {
    const titleChangeHandler = changeHandlerMaker("title")
    const descriptionChangeHandler = changeHandlerMaker("description")

    const submitBugHandler = submitHandlerMaker("bug", "create")

    let createForm = <form>
        <Input name="title" type="text" changeHandler={titleChangeHandler} />
        <label htmlFor="description">
            Description:
            <textarea id="description" onChange={descriptionChangeHandler} />
        </label>
        <br />
        <button type="submit" onClick={submitBugHandler}>Add</button>
    </form>

    return <TemplatePage content={createForm} />
}

const initialState = {
    form: {
        title: "",
        description: ""
    }
}

export default withForm(Create, initialState)