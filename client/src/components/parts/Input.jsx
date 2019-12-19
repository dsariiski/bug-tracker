import React from "react"

function Input({ id, type, changeHandler, value }) {
    //value is optional

    return (
        <div className="pair">
            <label htmlFor={id}>
                {id[0].toUpperCase() + id.slice(1)}:
            </label>
            <input id={id}
                value={value || undefined}
                type={type}
                onChange={changeHandler} />
        </div>
    )
}

export default Input