import React from "react"

import { Link } from "react-router-dom"

import Input from "../Input"
import Textarea from "../Textarea"
import Errors from "../Errors"

import "./form.css"

function Form({ id, title, submitName, fields, submitHandler, register, login, errors }) {
    // debugger
    fields = fields.map((field) => {
        // debugger
        // console.log(field.valueGetter())
        if (field.element.toLowerCase() === "input") {
            return (<React.Fragment key={field.id + "123"}>
                <Input id={field.id}
                    type={field.type}
                    changeHandler={field.changeHandler}
                    value={field.valueGetter ? field.valueGetter()[field.id] : null}
                    key={field.id}
                    labelName={field.labelName || undefined} />
                <Errors errors={errors[field.id]} />
            </React.Fragment>)
        } else {
            return (<React.Fragment key={field.id + "321"}>
                <Textarea id={field.id}
                    changeHandler={field.changeHandler}
                    form={id}
                    value={field.valueGetter ? field.valueGetter()[field.id] : null}
                    key={field.id}
                    labelName={field.labelName || undefined}/>
                <Errors errors={errors[field.id]} />
            </React.Fragment>)
        }
    })

    return <form id={id} className="center">
        <h2>{title}</h2>
        {fields}
        <button id={submitName} type="submit" onClick={submitHandler}>{submitName}</button>
        {register ? <Link to="register">Don't have an account? Register!</Link> : null}
        {login ? <Link to="login">Already have an account? Login!</Link> : null}
    </form>
}

export default Form