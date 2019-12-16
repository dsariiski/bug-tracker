import React from "react"

function Input({ name, type, changeHandler, value }) {
    //value is optional
    return (
        <React.Fragment>
            <label htmlFor={name}>
                {name[0].toUpperCase() + name.slice(1)}:
                <input id={name}
                    value={value}
                    type={type}
                    onChange={changeHandler} />
                <br />
            </label>
        </React.Fragment>
    )
}

export default Input