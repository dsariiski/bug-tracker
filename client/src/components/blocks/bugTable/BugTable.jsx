import React from "react"

import { Link, Redirect } from "react-router-dom"

import { parseCookies, first2Letters } from "../../../utils/helpers"

import "./bugTable.css"
import bugService from "../../../utils/service/bug-service"

function BugTable({ tableName, titles, getBugs, setBugs, entryName }) {

    const owner = parseCookies().username

    let rows = getBugs()

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
                    <td key={`id ${firstLetters}`}>
                        {/* {entry._id.substring(0, 5)}... */}
                        {entry._id}
                    </td>
                    <td key={`title ${firstLetters}`}>
                        <Link to={`/bug/${entry._id}/load`}>{entry.title}</Link>
                    </td>
                    <td key={`description ${firstLetters}`}>
                        {entry.description.substring(0, 15)}...
                    </td>
                    <td key={`status ${firstLetters}`}>
                        {entry.status}
                    </td>
                    <td key={`author ${firstLetters}`}>
                        {entry.creator.username}
                    </td>
                    <td key={`actions ${firstLetters}`}>
                        {owner === entry.creator.username ?
                            <React.Fragment>
                                <h5>
                                    <Link to={`${entryName}/edit/${entry._id}`}>&#128393;</Link>

                                    <Link to="#" onClick={() => {
                                        const del = window.confirm("Are you sure you want to delete this?")

                                        if(del){
                                            bugService.get.delBug(entry._id)
                                            .then(response => {
                                                console.log("deleted")
                                                rows = rows.filter((row) => {
                                                    if(row._id!==entry._id){
                                                        return row
                                                    }
                                                })
                                                setBugs(rows)
                                            }).catch(err => {
                                                console.log("couldn't delete")
                                                // console.log(err)
                                            })
                                        }
                                    }}>&#10005;</Link>
                                </h5>
                            </React.Fragment>
                            : <h5>Unauthorized</h5>}
                    </td>
                </tr>
            })}
        </tbody>
    </table >

    return table
}

export default BugTable