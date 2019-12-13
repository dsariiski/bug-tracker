function parseCookies() {
    const storedCookies = document.cookie.split("; ")

    const readableCookies = storedCookies.reduce(reduceCookies, {})

    return readableCookies
}

function reduceCookies(acc, jibberishCookie) {
    const [name, value] = jibberishCookie.split("=")

    return { ...acc, [name]: value }
}

function errorHandler(err) {
    console.warn("Something went wrong")

    console.dir(err)
}

export {
    parseCookies,
    errorHandler
}