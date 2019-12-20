import React, { useState } from "react"

import { Link } from "react-router-dom"

import "./details.css"

import TemplatePage from "../../../hoc/TemplatePage"
import Comment from "../../../parts/Comment"

import bugService from "../../../../utils/service/bug-service"
import { parseCookies, errorHandler } from "../../../../utils/helpers"

let first = true

function Details(props) {
    let load = props.match.params.load

    const { id } = props.match.params
    const [bug, setBug] = useState({ _id: id, creator: "" })
    const [authorized, setAuthorized] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const [comment, setComment] = useState("")

    const creatorName = parseCookies().username
    const loggedIn = parseCookies().userToken

    function getBugsFromDb() {
        bugService.get.bug(bug._id)
            .then(({ data }) => {
                if (first) {
                    bugService.get.updateViews(id)
                    first = false
                    setBug(data)
                }

                if (creatorName) {
                    setAuthenticated(creatorName)
                }

                if (creatorName === data.creator.username) {
                    setAuthorized(true)
                }

                if (((bug.comments || [1]).length !== data.comments.length)) {
                    setBug(data)
                }
            }).catch(errorHandler)
    }

    if (first || load) {
        first = false
        load = false

        getBugsFromDb()
    }

    const heading = <h1>Details</h1>

    const detailsContent =
        <div className="details-content">
            <div className="row-pair">
                <span className="label">Description:</span>
                <span className="content">{bug.description}</span>
            </div>
            <div className="row-pair">
                <span className="label">Views:</span>
                <span className="content">{bug.views}</span>
            </div>
            <div className="row-pair">
                <span className="label">Status:</span>
                <span className="content">{bug.status}</span>
            </div>
            <div className="row-pair">
                <span className="label">Creator:</span>
                <span className="content">{bug.creator.username}</span>
            </div>
        </div>


    const bugEdit = <Link to={`/bug/edit/${id}`}>
        <button disabled={!authorized}>Edit</button>
    </Link>

    const bugDiv = <div className="bug center">
        <h2>{bug.title}</h2>

        {detailsContent}

        {bugEdit}
    </div>

    const commentsHeading = <h2 className="comments-heading">Comments:</h2>

    const commentsContent = <div className="comments center">
        {bug.comments ? bug.comments.map(comment => <Comment key={comment._id} {...comment} />) : <h2>There are no comments yet...</h2>}
    </div>

    const addCommentHeading = <h2 className="comments-heading">Add a comment:</h2>

    const addComment = <form className="comment-form center" onSubmit={(event) => {
        event.preventDefault()

        if (authenticated) {
            const commentBody = {
                bugId: id,
                comment: comment
            }

            bugService.post.comment(commentBody).then(rezult => {
                console.log("comment created successfully!")
                first = true

                setComment("")

                getBugsFromDb()

            }).catch(err => {
                console.log("couldn't create comment")
                // console.dir(err)
            })
        }
    }}>
        <input type="text" value={comment} onChange={(event) => {
            let { value } = event.target

            setComment(value)
        }} />
        <button className="comment-btn" type="submit">Comment</button>
    </form>

    const addCommentSection = <React.Fragment>
        {addCommentHeading}
        {addComment}
    </React.Fragment>

    const content = <React.Fragment>
        {bugDiv}

        {commentsHeading}
        {commentsContent}

        {loggedIn ? 
        addCommentSection : null}
        
    </React.Fragment>

    return (
        <TemplatePage heading={heading} content={content} />
    )
}

export default Details