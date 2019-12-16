import React from "react"

import { Link } from "react-router-dom"

import { parseCookies, first2Letters } from "../../../utils/helpers"

import "./bugTable.css"

function BugTable({ tableName, titles, rows, entryName }) {

    const owner = parseCookies().username

    const table = <table className={tableName}>
        <thead>
            <tr>
                {titles.map(title => <th key={first2Letters(title)}>{title}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows.map(entry => {
                const firstLetters = first2Letters(entry._id)

                return <tr key={entry._id}>
                    <td key={`title ${firstLetters}`}>
                        <Link to={`/bug/${entry._id}`}>{entry.title}</Link>
                    </td>
                    <td key={`description ${firstLetters}`}>
                        {entry.description.substring(0, 15)}...
                    </td>
                    <td key={`author ${firstLetters}`}>
                        {entry.creator.username}
                    </td>
                    <td key={`actions ${firstLetters}`}>
                        {owner === entry.creator.username ?
                            <React.Fragment>
                                <Link to={`${entryName}/edit/${entry._id}`}>&#128393;</Link>
                                <Link to="#">&#10005;</Link>
                            </React.Fragment>
                            : <h5>Unauthorized</h5>}
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