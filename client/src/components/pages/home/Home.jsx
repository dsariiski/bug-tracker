import React, { Component } from "react"

import "./home.css"

import TemplatePage from "../../hoc/TemplatePage"
import BugTable from "../../blocks/bugTable/BugTable"

import bugService from "../../../utils/service/bug-service"

import { parseCookies } from "../../../utils/helpers"

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            content: [],
            bugs: [],
            updates: {}
        }
    }

    renderHeading = () => {
        console.log(this.props)
        return <h1>Welcome {this.state.username || "home"}</h1>
    }

    getBugs = () => {
        return this.state.bugs
    }

    setBugs = (bugs) => {
        this.setState((prevState) => {
            return { bugs }
        })
    }

    renderContent = () => {
        const titles = ["Id", "Title", "Description", "Status", "Author", "Actions"]

        const content2 = <BugTable
            tableName="bugs"
            titles={titles}
            getBugs={this.getBugs}
            setBugs={this.setBugs}
            getUpdates={this.getUpdates}
            setUpdates={this.setUpdates}
            entryName="bug" />

        return content2
    }

    equal(obj1, obj2) {
        obj1 = Object.entries(obj1)
        obj2 = Object.entries(obj2)

        for (let [key, val] of obj1) {
            if (val !== obj2[key]) {
                return false
            }
        }

        return true
    }

    setUpdates = (updates) => {
        this.setState((prevState) => {
            return { updates: {...prevState.updates, ...updates} }
        })
    }

    getUpdates = () => {
        // debugger
        return this.state.updates
    }

    componentDidMount() {
        const { username } = parseCookies()

        if (username) {
            this.setState({ username })
        }

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
        const { username } = parseCookies()

        if (username !== this.state.username) {
            this.setState({ username })
        }

        bugService.get.all().then(bugs => {
            this.setState((prevState) => {
                const equal = this.equal(prevState, bugs)

                if (equal) {
                    return { bugs: bugs.data }
                }
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