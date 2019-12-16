import React from "react"

import { Link } from "react-router-dom"

import Input from "../Input"
import Textarea from "../Textarea"

import "./form.css"

function Form({ id, title, submitName, fields, submitHandler, register, login }) {
    fields = fields.map((field) => {
        if (field.element.toLowerCase() === "input") {
            return <Input id={field.id}
                type={field.type}
                changeHandler={field.changeHandler}
                value={field.value}
                key={field.id} />
        } else {
            return <Textarea id={field.id}
                changeHandler={field.changeHandler}
                form={id}
                value={field.value}
                key={field.id} />
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