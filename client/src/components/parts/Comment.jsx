import React from "react"

function Comment({ author, comment }) {
    return <div className="comment-pair">
        <span className="comment-label">
            <h3>{author}:</h3>
        </span>
        <span className="comment-content">
            {comment}
    </span>
    </div>
}

export default Comment