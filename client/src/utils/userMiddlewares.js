import axios from "axios"

const baseUrl = "http://localhost:3001/user/"

function login(username, password) {
    const userBody = { username, password }
    const loginUrl = baseUrl + "login"

    return axios.post(loginUrl, JSON.stringify(userBody), {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
}

function register(username, password, repeatPassword) {
    const userBody = { username, password }
    const registerUrl = baseUrl + "register"

    const postPromise = axios.post(registerUrl, JSON.stringify(userBody), {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return password === repeatPassword ? postPromise : Promise.reject("passwords must match!")
}

export default {
    post: {
        login,
        register
    }
}
