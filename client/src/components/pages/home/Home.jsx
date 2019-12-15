import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./home.css"

import TemplatePage from "../../hoc/TemplatePage"
import BugTable from "../../blocks/bugTable/BugTable"

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
        const titles = ["Title", "Description", "Author", "Actions"]

        const content2 = <BugTable
            tableName="bugs"
            titles={titles}
            rows={this.state.bugs}
            entryName="bug" />


        return content2
    }

    componentDidMount() {
        bugService.get.all().then(bugs => {
            this.setState(() => {
                return { bugs: bugs.data }
            })
        }).catch(err => {
            console.log(`couldn't load bugs`)
            console.dir(err)
        })

    }

    componentDidUpdate() {
        bugService.get.all().then(bugs => {
            this.setState(() => {
                return { bugs: bugs.data }
            })
        }).catch(err => {
            console.log(`couldn't load bugs`)
            console.dir(err)
        })
    }

    render() {
        return <TemplatePage content={this.renderContent()} heading={this.renderHeading()} />
    }

}

export default Home