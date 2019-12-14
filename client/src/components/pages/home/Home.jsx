import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./home.css"

import TemplatePage from "../../hoc/TemplatePage"

import bugService from "../../../utils/bug-service"

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            heading: "Welcome home",
            content: [],
            bugs: []
        }
    }

    renderHeading = () => {
        return <h1>{this.state.heading}</h1>
    }

    renderContent = () => {
        const content = <table id="bugs">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.state.bugs.map(bug => {
                    return <tr key={bug._id}>
                        <td key={`title ${bug._id.substring(0, 2)}`}>
                            <Link to={`/bug/${bug._id}`}>{bug.title}</Link>
                        </td>
                        <td key={`description ${bug._id.substring(0, 2)}`}>
                            {bug.description.substring(0, 15)}...
                    </td>
                        <td key={`author ${bug._id.substring(0, 2)}`}>
                            {bug.creator.username}
                        </td>
                        <td>
                            <Link to={`bug/edit/${bug._id}`}>&#128393;</Link>
                            <Link to="#">&#10005;</Link>
                            {/* <button>&#128393;</button>
                            <button>&#10005;</button> */}
                        </td>
                        <td>{"promenliva1", "promenilva2"}</td>
                    </tr>
                })}
            </tbody>
        </table>

        return content
    }

    componentDidMount() {
        bugService.get.all().then(bugs => {
            this.setState(() => {
                return { bugs: bugs.data }
            })
        }).catch(err => {
            console.log(`there's an error...`)
            console.dir(err)
        })

    }

    render() {
        return <TemplatePage content={this.renderContent()} heading={this.renderHeading()} />
    }

}

export default Home