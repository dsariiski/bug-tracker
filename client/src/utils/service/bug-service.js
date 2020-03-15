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

function updateViews(id) {
    const updateBugUrl = baseUrl + `bug/update/${id}`

    return axios.get(updateBugUrl)
}

function my() {
    const getMyBugsUrl = baseUrl + "bug/my"

    return axios.get(getMyBugsUrl, {
        withCredentials: true
    })
}

function create({ title, description }) {
    const createUrl = baseUrl + "bug/create"
    const bugBody = {
        title,
        description,
        status: undefined
    }

    return axios.post(createUrl, JSON.stringify(bugBody), {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
}

function edit(newData) {
    const id = newData._id
    const editUrl = baseUrl + "bug/edit/" + id

    const { title, description, status, views } = newData

    const bugBody = { title, description, status, views }

    return axios.post(editUrl, JSON.stringify(bugBody), {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
}

function comment(commentBody) {
    const { bugId } = commentBody
    const commentUrl = baseUrl + "bug/comment/" + bugId

    return axios.post(commentUrl, JSON.stringify(commentBody), {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
}

function delBug(id) {
    const deleteUrl = baseUrl + "bug/delete/" + id

    return axios.get(deleteUrl)
}

export default {
    get: {
        all,
        bug,
        my,
        updateViews,
        delBug
    },
    post: {
        create,
        edit,
        comment
    }
}