import axios from "axios"

const baseUrl = "http://localhost:3001/"

function all() {
    const getAllUrl = baseUrl + "bug/"

    return axios.get(getAllUrl)
}

function bug(id) {
    const getBugUrl = baseUrl + `bug/${id}`

    return axios.get(getBugUrl)
}

function create({title, description}) {
    const createUrl = baseUrl + "bug/create"
    const bugBody = {
        title,
        description,
        status: undefined
    }

    return axios.post(createUrl, JSON.stringify(bugBody), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

function edit(newData) {
    const id = newData._id
    const editUrl = baseUrl + "bug/edit/" + id

    const {title, description, status, views} = newData

    const bugBody = {title, description, status, views}

    return axios.post(editUrl, bugBody, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export default {
    get: {
        all,
        bug
    },
    post: {
        create,
        edit
    }
}