function parseCookies() {
    const storedCookies = document.cookie.split("; ")

    const readableCookies = storedCookies.reduce(reduceCookies, {})

    return readableCookies
}

function reduceCookies(acc, jibberishCookie) {
    const [name, value] = jibberishCookie.split("=")

    return { ...acc, [name]: value }
}

function first2Letters(word){
    return word.substring(0, 2)
}

function errorHandler(err) {
    console.warn("Something went wrong")

    console.dir(err)
}

export {
    parseCookies,
    first2Letters,
    errorHandler
}