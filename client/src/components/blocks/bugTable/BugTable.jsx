import React from "react"

import { Link } from "react-router-dom"

import { parseCookies } from "../../../utils/helpers"

import "./bugTable.css"

function BugTable({ tableName, titles, rows, entryName }) {

    const owner = parseCookies().username

    const table = <table className={tableName}>
        <thead>
            <tr>
                {titles.map(title => <th>{title}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows.map(entry => {
                return <tr key={entry._id}>
                    <td key={`title ${entry._id.substring(0, 2)}`}>
                        <Link to={`/bug/${entry._id}`}>{entry.title}</Link>
                    </td>
                    <td key={`description ${entry._id.substring(0, 2)}`}>
                        {entry.description.substring(0, 15)}...
                    </td>
                    <td key={`author ${entry._id.substring(0, 2)}`}>
                        {entry.creator.username}
                    </td>
                    <td>
                        {owner === entry.creator.username ?
                            <React.Fragment>
                                <Link to={`${entryName}/edit/${entry._id}`}>&#128393;</Link>
                                <Link to="#">&#10005;</Link>
                            </React.Fragment>
                            : <React.Fragment />}
                        {/* <button>&#128393;</button>
                            <button>&#10005;</button> */}
                    </td>
                </tr>
            })}
        </tbody>
    </table>

    return table
}

export default BugTable