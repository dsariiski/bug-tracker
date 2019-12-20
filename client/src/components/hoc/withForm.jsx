import React, { Component } from "react"

import { parseCookies, reduceErrors } from "../../utils/helpers"
import userService from "../../utils/service/user-service"
import bugService from "../../utils/service/bug-service"

import { store } from 'react-notifications-component';

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

        changeHandlerMaker = (name, type, time, omitValidations) => {
            let id

            // debugger

            if (!time) {
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
                    validationPromise = validations[type].repeatPassword({
                        password: this.state.form.password,
                        repeatPassword: value
                    })
                } else {
                    validationPromise = validations[type][name]({
                        [name]: value
                    })
                }

                //omitting real-time validations when logging in
                // if(!omitValidations){
                validationPromise.then(ok => {
                    this.setState((prevState) => {
                        return { errors: { ...prevState.errors, [name]: [] } }
                    })
                }).catch(errors => {
                    if (errors.name === "ValidationError") {
                        this.setState(prevState => {
                            return { errors: { ...prevState.errors, [errors.path]: [errors.message] } }
                        })
                    }
                })
                // }

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
            const { username } = userInfo.data
            const updatedCookies = parseCookies()
            this.setCookies(updatedCookies)

            this.props.history.push("/")

            store.addNotification({
                title: "Welcome",
                message: `${username}`,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })

        }

        registerResolve = userInfo => {
            // console.log(`Registered successfully!`)

            store.addNotification({
                message: `Registration successful!`,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        }

        createBugResolve = bug => {
            this.props.history.push("/my")

            store.addNotification({
                message: `Report submitted!`,
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

            // console.log(`${bug.data.message}`)
        }

        editBugResolve = bug => {
            // console.log("edited successfully!")

            this.props.history.push(`/my`)

            store.addNotification({
                message: `Edit successful!`,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        }

        getErrors = () => {
            const result = this.state.errors
            return result
        }

        errorHandler = call => {
            const error = call.response.data.errors[0]
            if ((call.response.status === 409) || (call.response.status === 403)) {
                return this.setState((prevState) => {
                    prevState.errors["username"] = [error]
                    return { errors: { ...prevState.errors } }
                })
            }

            return console.log(error)
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
                setCookie={this.setCookies}
                getErrors={this.getErrors} />
        }
    }
}

export default withForm