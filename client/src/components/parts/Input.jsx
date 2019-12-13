import React from "react"

function Input({ name, type, changeHandler, value }) {
    //value is optional
    return (
        <React.Fragment>
            <label htmlFor={name}>
                {name}
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