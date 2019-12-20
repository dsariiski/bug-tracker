import React from "react"

import Navigation from "../blocks/navigation/Navigation"

import Footer from "../blocks/footer/Footer"

function TemplatePage({content, heading}){
    return (
        <React.Fragment>
            <Navigation />

            {heading}
            
            {content}
            
            <Footer />

        </React.Fragment>
    )
}

export default TemplatePage