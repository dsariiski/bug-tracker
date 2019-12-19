import React, { Component } from "react"

import { parseCookies, reduceErrors } from "../../utils/helpers"
import userService from "../../utils/service/user-service"
import bugService from "../../utils/service/bug-service"

import validations from "../../utils/validation"

function withForm(Cmp, initialState) {
    return class extends Component {
        constructor(props) {
            super(props)

            this.state = {
                form: initialState.form,
                common: { ...initialState.common || "" },
                cookies: parseCookies(),
                errors: {},
                counter: 0
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

        componentDidMount() {
            this.setState((prevState) => {
                return { common: { ...prevState.common, firstRender: true } }
            })
        }

        changeHandlerMaker = (name, type, time) => {
            let id

            if(!time){
                time = 0
            }

            return (event) => {
                if (id) {
                    clearTimeout(id)
                    id = undefined
                }
                const { value } = event.target

                let validationPromise = ""

                if (name === "repeatPassword") {
                    // debugger
                    validationPromise = validations[type].repeatPassword({
                        password: this.state.form.password,
                        repeatPassword: value
                    })
                } else {
                    validationPromise = validations[type][name]({
                        [name]: value
                    })
                }

                // debugger
                validationPromise.then(ok => {
                    this.setState((prevState) => {
                        return { errors: { ...prevState.errors, [name]: [] } }
                    })
                }).catch(errors => {
                    // debugger
                    if (errors.name === "ValidationError") {
                        this.setState(prevState => {
                            return { errors: { ...prevState.errors, [errors.path]: [errors.message] } }
                        })
                    }
                })

                id = setTimeout(() => {
                    this.setState(({ form }) => {
                        return {
                            form: {
                                ...form,
                                [name]: value
                            }
                        }
                    })

                    id = undefined
                }, time)
            }
        }

        submitHandlerMaker = (category, type) => event => {
            event.preventDefault()

            if (category === "user") {
                const { username, password, repeatPassword } = this.state.form

                const operation = repeatPassword ? "register" : "login"

                validations.user[operation]({ username, password, repeatPassword }).then((ok) => {
                    userService.post[type](username, password, repeatPassword)
                        .then(this.handlers[category][type])
                        .catch(this.handlers.error)
                }).catch(err => {
                    const errors = reduceErrors(err)

                    // debugger
                    this.setState({ errors })
                })


            } else if (category === "bug") {
                const bugData = this.state.form

                validations.other.bug(bugData).then(ok => {
                    bugService.post[type](bugData)
                        .then(this.handlers[category][type])
                        .catch(this.handlers.error)
                }).catch(err => {
                    const errors = reduceErrors(err)

                    this.setState({ errors })
                })
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

        getErrors = () => {
            const result = this.state.errors
            return result
        }

        errorHandler = call => {
            const error = call.response.data.errors[0]
            debugger
            if ((call.response.status === 409) || (call.response.status === 403)) {
                return this.setState((prevState) => {
                    prevState.errors["username"] = [error]
                    return { errors: { ...prevState.errors } }
                })
            }

            return console.log(error)
        }

        // componentDidUpdate(){
        //     console.log(this.state.counter)

        //     // this.setState((prevState) => {
        //     //     return {count: prevState.count + 1}
        //     // })
        // }

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
                setCookie={this.setCookies}
                getErrors={this.getErrors} />
        }
    }
}

export default withForm