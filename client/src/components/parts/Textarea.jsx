import React from "react"

function Textarea({ id, changeHandler, formName, value }) {
    //value is optional

    return (
        <div className="ta">
            <label htmlFor={id}>
                {id[0].toUpperCase() + id.slice(1)}:
            </label>
            <textarea id={id}
                value={value || undefined}
                form={formName}
                onChange={changeHandler} />
        </div>
    )

}

export default Textarea