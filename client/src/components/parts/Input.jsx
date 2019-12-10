import React from "react"

function Input(props) {
    const { name, type, changeHandler } = props

    return (
        <div>
            <label htmlFor={name}>
                {name}
                <input id={name} type={type} onChange={changeHandler} />
                <br />
            </label>
        </div>
    )
}

export default Input