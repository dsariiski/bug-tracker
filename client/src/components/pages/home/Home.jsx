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
        const content = <div className="bugs">
            <ul>{this.state.bugs.map(bug => {
                return <React.Fragment key={bug._id}>
                    <Link to={`/bug/${bug._id}`} id={bug._id}>{bug.title}</Link>
                    <br />
                </React.Fragment>
            })}</ul>
        </div>

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