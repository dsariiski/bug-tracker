import React, { Component } from "react"

import userMiddlewares from "../../utils/userMiddlewares"

function withForm(Cmp, initialState) {
    return class extends Component {
        constructor(props) {
            super(props)

            this.state = {
                form: initialState
            }

            this.userHandlers = {
                login: this.loginHandler,
                register: this.registerHandler,
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

        submitHandlerMaker = type => event => {
            //TODO: add post-auth logic
            event.preventDefault()

            const { username, password, repeatPassword } = this.state.form

            userMiddlewares.post[type](username, password, repeatPassword)
                .then(this.userHandlers[type])
                .catch(this.userHandlers["error"])
        }


        loginHandler = userInfo => {
            alert(`Welcome ${userInfo.data.username}`)
        }

        registerHandler = userInfo => {
            alert(`Registered successfully!`)
        }

        errorHandler = userError => {
            alert("something went wrong.. :")
            console.log(userError.response.data)
        }

        render() {
            return <Cmp
                changeHandlerMaker={this.changeHandlerMaker}
                submitHandlerMaker={this.submitHandlerMaker} />
        }
    }
}

export default withForm