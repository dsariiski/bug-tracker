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
        const titles = ["ID", "Title", "Description", "Status", "Author", "Actions"]

        let content = ""

        if (this.state.loggedIn) {
            if (this.state.first) {
                this.setState(() => {
                    return {
                        first: false,
                        heading: "My submissions:"
                    }
                })
            }

            content = <BugTable
                tableName="bugs"
                titles={titles}
                getBugs={this.getBugs}
                setBugs={this.setBugs}
                getUpdates={this.getUpdates}
                setUpdates={this.setUpdates}
                entryName="bug" />
        }

        return content
    }

    getBugs = () => {
        return this.state.bugs
    }

    setBugs = (bugs) => {
        this.setState((prevState) => {
            return { bugs }
        })
    }

    setUpdates = (updates) => {
        this.setState((prevState) => {
            return { updates: {...prevState.updates, ...updates} }
        })
    }

    getUpdates = () => {
        return this.state.updates || {}
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