import React from "react"

import { Link } from "react-router-dom"

import { parseCookies, first2Letters } from "../../../utils/helpers"

import "./bugTable.css"
import bugService from "../../../utils/service/bug-service"

import { store } from 'react-notifications-component';

function BugTable({ tableName, titles, getBugs, setBugs, entryName, getUpdates, setUpdates }) {
    const owner = parseCookies().username
    const loggedIn = parseCookies().userToken || ""
    const admin = loggedIn.includes("admin")

    if (!loggedIn) {
        titles.pop()
    }

    let rows = getBugs()

    const table =
        <React.Fragment>
            <table className={tableName}>
                <thead>
                    <tr>
                        {titles.map(title => <th key={first2Letters(title)}>{title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(entry => {
                        //key generation
                        const firstLetters = first2Letters(entry._id)

                        let initialStatus = getUpdates()[entry._id] || entry.status

                        // debugger

                        return <tr key={entry._id}>
                            <td key={`id ${firstLetters}`}>
                                {/* {entry._id.substring(0, 5)}... */}
                                {entry._id}
                            </td>
                            <td key={`title ${firstLetters}`}>
                                <Link to={`/bug/${entry._id}`}>{entry.title}</Link>
                            </td>
                            <td key={`description ${firstLetters}`}>
                                {entry.description.substring(0, 15)}...
                            </td>
                            <td key={`status ${firstLetters}`} className={admin ? "" : entry.status.toLowerCase()}>
                                {admin ? <select value={initialStatus} onChange={(event) => {
                                    const { value } = event.target

                                    setUpdates({ [entry._id]: value })
                                }}>
                                    <option value="pending">pending</option>}
                                    <option value="confirmed">confirmed</option>}
                                    <option value="fixed">fixed</option>}
                                </select> : entry.status}
                            </td>
                            <td key={`author ${firstLetters}`}>
                                <h5>{entry.creator.username}</h5>
                            </td>
                            {loggedIn ? <td key={`actions ${firstLetters}`}>
                                {admin || (owner === entry.creator.username) ?
                                    <React.Fragment>
                                        <h5>
                                            <Link to={`${entryName}/edit/${entry._id}`}>&#128393;</Link>
                                            <Link to="#" onClick={() => {
                                                const del = window.confirm("Are you sure you want to delete this?")

                                                if (del) {
                                                    bugService.get.delBug(entry._id)
                                                        .then(response => {
                                                            console.log("deleted")
                                                            rows = rows.filter((row) => {
                                                                if (row._id !== entry._id) {
                                                                    return row
                                                                }
                                                            })
                                                            setBugs(rows)

                                                            // store.addNotification({
                                                            //     // title: `Report`,
                                                            //     message: "Report deleted",
                                                            //     type: "danger",
                                                            //     insert: "top",
                                                            //     container: "top-right",
                                                            //     animationIn: ["animated", "fadeIn"],
                                                            //     animationOut: ["animated", "fadeOut"],
                                                            //     dismiss: {
                                                            //       duration: 2000,
                                                            //       onScreen: false
                                                            //     }
                                                            // })
                                                        }).catch(err => {
                                                            console.log("couldn't delete")
                                                            console.log(err)
                                                        })
                                                }
                                            }}>&#10005;</Link>
                                        </h5>
                                    </React.Fragment>
                                    : <h5>Unauthorized</h5>}
                            </td> : null}
                        </tr>
                    })}
                </tbody>
            </table >
            {admin ?
                <button
                    type="submit"
                    className="boss-button"
                    onClick={() => {
                        const updates = getUpdates()

                        let promises = []

                        for (let update in updates) {
                            const _id = update
                            const val = updates[update]

                            promises.push(bugService.post.edit({ _id, status: val }))
                        }

                        Promise.all([promises])
                            .then(rezult => {
                                console.log("update finished")
                                // console.log(rezult)

                                store.addNotification({
                                    // title: `Report`,
                                    message: "Changes saved.",
                                    type: "info",
                                    insert: "top",
                                    container: "top-right",
                                    animationIn: ["animated", "fadeIn"],
                                    animationOut: ["animated", "fadeOut"],
                                    dismiss: {
                                        duration: 2000,
                                        onScreen: false
                                    }
                                })
                            }).catch(err => {
                                console.log("couldn't finish update")
                                console.log(err)
                            })

                    }}>Save</button>
                : null}
        </React.Fragment>

    return table
}

export default BugTable