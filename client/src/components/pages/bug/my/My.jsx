import React, { Component } from "react"

import "../../home/home.css"

import TemplatePage from "../../../hoc/TemplatePage"
import BugTable from "../../../blocks/bugTable/BugTable"

import bugService from "../../../../utils/service/bug-service"

import { parseCookies } from "../../../../utils/helpers"

class My extends Component {
    constructor(props) {
        super(props)

        this.state = {
            heading: "Login to see your submissions",
            content: [],
            bugs: [],
            loggedIn: parseCookies().userToken,
            first: true
        }
    }

    renderHeading = () => {
        return <h1>{this.state.heading}</h1>
    }

    renderContent = () => {
        const titles = ["Title", "Description", "Author", "Actions"]

        let content = ""

        if (this.state.loggedIn) {
            if (this.state.first) {
                this.setState(() => {
                    return {
                        first: false,
                        heading: "Submissions:"
                    }
                })
            }

            content = <BugTable
                tableName="bugs"
                titles={titles}
                rows={this.state.bugs}
                entryName="bug" />
        }

        return content
    }

    componentDidMount() {
        bugService.get.my().then(bugs => {
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

export default My