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

    console.log(err.toString())
}

function reduceErrors (errors) {
    errors = errors.inner


    return errors.reduce((errAccumulator, currentErr, currentIndex) => {
        if (currentIndex === 0) {
            errAccumulator = {}
        }

        let { errors, path } = currentErr

        if (!errAccumulator[path]) {
            errAccumulator[path] = []
        }

        errAccumulator[path].push(errors[0])

        return errAccumulator

    }, errors[0])
}

export {
    parseCookies,
    first2Letters,
    errorHandler,
    reduceErrors
}