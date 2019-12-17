import React, { useState } from "react"

import { Link } from "react-router-dom"

import "./details.css"

import TemplatePage from "../../../hoc/TemplatePage"

import bugService from "../../../../utils/service/bug-service"
import { parseCookies, errorHandler } from "../../../../utils/helpers"

function Details(props) {
    const { id } = props.match.params
    const [bug, setBug] = useState({ id, creator: "" })
    const [authorized, setAuthorized] = useState(false)

    const creatorName = parseCookies().username

    bugService.get.bug(bug.id)
        .then(({ data }) => {
            if(creatorName===data.creator.username){
                setAuthorized(true)
            }

            setBug(data)
        }).catch(errorHandler)

    const heading = <h1>Details</h1>

    const bugContent = <div className="bug">
        <h2>{bug.title}</h2>
        <span>{bug.description}</span>
        <br />
        <span className="views">Views: {bug.views}</span>
        <br />
        <span>Status: {bug.status}</span>
        <br />
        <span>Creator: {bug.creator.username}</span>
        <br />
        <Link to={`/bug/edit/${id}`}>
            <button disabled={!authorized}>Edit</button>
        </Link>
    </div>

    return (
        <TemplatePage heading={heading} content={bugContent} />
    )
}

export default Details