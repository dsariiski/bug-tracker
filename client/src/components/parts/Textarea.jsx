import React from "react"

function Textarea({ id, changeHandler, formName, value, labelName }) {
    //value is optional

    return (
        <div className="ta">
            <label htmlFor={id}>
                {labelName || (id[0].toUpperCase() + id.slice(1))}:
            </label>
            <textarea id={id}
                value={value || undefined}
                form={formName}
                onChange={changeHandler} />
        </div>
    )

}

export default Textarea