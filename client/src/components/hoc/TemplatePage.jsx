import React from "react"

import Navigation from "../blocks/navigation/Navigation"

function TemplatePage({content, heading}){
    return (
        <React.Fragment>
            <Navigation />

            {heading}
            
            {content}
            
        </React.Fragment>
    )
}

export default TemplatePage