import React from "react"

function Errors({errors}) {
    // debugger
    if (!errors) {
        return <React.Fragment />
    }

    return (
        <div className="errors">
            {errors.map((x, i) => <span key={i + 5}>{x}</span>)}
        </div>
    )
}

export default Errors