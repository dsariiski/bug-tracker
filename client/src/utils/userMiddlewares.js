import axios from "axios"

const baseUrl = "http://localhost:3001/user/"

function login(username, password) {
    const userBody = { username, password }
    const loginUrl = baseUrl + "login"

    return axios.post(loginUrl, JSON.stringify(userBody), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

function register(username, password, repeatPassword){
    const userBody = {username, password}
    const registerUrl = baseUrl + "register"

    return axios.post(registerUrl, JSON.stringify(userBody), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export default {
    post: {
        login,
        register
    }
}
