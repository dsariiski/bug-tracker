import React, { Component } from "react"

import { parseCookies } from "../../utils/helpers"
import userService from "../../utils/user-service"
import bugService from "../../utils/bug-service"

function withForm(Cmp, initialState) {
    return class extends Component {
        constructor(props) {
            super(props)

            this.state = {
                form: initialState.form,
                common: { ...initialState.common || "" },
                cookies: parseCookies()
            }

            this.handlers = {
                bug: {
                    create: this.createBugResolve,
                    edit: this.editBugResolve,
                },
                user: {
                    login: this.loginResolve,
                    register: this.registerResolve,
                },
                error: this.errorHandler
            }
        }

        changeHandlerMaker = name => event => {
            //TODO: add debouncing
            const { value } = event.target

            this.setState(({ form }) => {
                return {
                    form: {
                        ...form,
                        [name]: value
                    }
                }
            })
        }

        submitHandlerMaker = (category, type) => event => {
            event.preventDefault()

            if (category === "user") {
                const { username, password, repeatPassword } = this.state.form

                userService.post[type](username, password, repeatPassword)
                    .then(this.handlers[category][type])
                    .catch(this.handlers.error)
            } else if (category === "bug") {
                const bugData = this.state.form
                // const { id } = this.state.common

                bugService.post[type](bugData)
                    .then(this.handlers[category][type])
                    .catch(this.handlers.error)
            }
        }

        getCookie = (name) => {
            return this.state.cookies[name]
        }

        setCookies = (values) => this.setState((prevState) => {
            return { cookies: { ...prevState.cookies, ...values } }
        })

        getCommon = (name) => {
            return this.state.common[name]
        }

        updateCommon = (name, value) => {
            this.setState((prevState) => {
                return { common: { ...prevState.common, [name]: value } }
            })
        }

        getFormState = () => {
            return this.state.form
        }

        updateFormState = formState => {
            this.setState((prevState, props) => {
                return { form: formState }
            })
        }

        loginResolve = userInfo => {
            const updatedCookies = parseCookies()
            this.setCookies(updatedCookies)

            this.props.history.go(-1)

            console.log(`Welcome ${userInfo.data.username}`)
        }

        registerResolve = userInfo => {
            console.log(`Registered successfully!`)
        }

        createBugResolve = bug => {
            console.log(`${bug.data.message}`)
        }

        editBugResolve = bug => {
            console.log("edited successfully!")
        }

        errorHandler = userError => {
            alert("something went wrong.. :")
            console.log(userError)
        }

        render() {
            return <Cmp
                {...this.props}
                changeHandlerMaker={this.changeHandlerMaker}
                submitHandlerMaker={this.submitHandlerMaker}
                getFormState={this.getFormState}
                updateFormState={this.updateFormState}
                getCommon={this.getCommon}
                updateCommon={this.updateCommon}
                getCookie={this.getCookie}
                setCookie={this.setCookies} />
        }
    }
}

export default withForm