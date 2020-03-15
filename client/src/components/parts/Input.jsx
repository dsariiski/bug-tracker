import React from "react"

function Input({ id, type, changeHandler, value, labelName }) {
    //value is optional

    return (
        <div className="pair">
            <label htmlFor={id}>
                {labelName || (id[0].toUpperCase() + id.slice(1))}:
            </label>
            <input id={id}
                value={value || undefined}
                type={type}
                onChange={changeHandler} />
        </div>
    )
}

export default Input