import React, { Component } from "react"

import "./home.css"

import TemplatePage from "../../hoc/TemplatePage"
import BugTable from "../../blocks/bugTable/BugTable"

import bugService from "../../../utils/service/bug-service"

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