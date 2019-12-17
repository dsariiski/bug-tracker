import * as yup from "yup"

function makeBlueprint(value) {
    const userRegex = new RegExp("^[a-z]+$")
    const passRegex = /^\w+$/

    const values = {
        username: yup.string()
            .required("Username is required")
            .min(4, "Username must be at least 4 symbols long")
            .max(10, "Username can't be longer than 10 symbols")
            .matches(userRegex, "Username can only contain English letters"),
        password: yup.string()
            .required("Password is required")
            .min(4, "Password must be at least 4 symbols long")
            .max(6, "Password can't be longer than 6 symbols")
            .matches(passRegex, "Password can only contain English letters, digits and underscores"),
        repeatPassword: yup.string().oneOf([yup.ref('password')], "Passwords don't match!")
    }

    return values[value]
}

function validateUsername({ username }) {
    const usernameBlueprint = makeBlueprint("username")
    const usernameSchema = yup.object({ username: usernameBlueprint })

    return usernameSchema.validate({ username })
}

function validatePassword({ password }) {
    const passwordBlueprint = makeBlueprint("password")
    const passwordSchema = yup.object({ password: passwordBlueprint })

    return passwordSchema.validate({ password })
}

function validateRePassword({ password, repeatPassword }) {
    // const passBlueprint = makeBlueprint("password")
    // const reBlueprint = makeBlueprint("repeatPassword")

    // const reSchema = yup.object({
    //     password: passBlueprint,
    //     repeatPassword: reBlueprint
    // })

    // return reSchema.validate({ password, repeatPassword })

    return password === repeatPassword ?
        Promise.resolve("Passwords are equal!") :
        Promise.reject({ name: "ValidationError", path: "repeatPassword", message: "Passwords don't match!" })
}

function validateRegister({ username, password, repeatPassword }) {
    const userBlueprint = makeBlueprint("username")
    const passBlueprint = makeBlueprint("password")
    const reBlueprint = makeBlueprint("repeatPassword")

    const registerSchema = yup.object({
        username: userBlueprint,
        password: passBlueprint,
        repeatPassword: reBlueprint
    })

    return registerSchema.validate({ username, password, repeatPassword }, { abortEarly: false })
}

function validateLogin(){
    return Promise.resolve()
}

const validations = {
    username: validateUsername,
    password: validatePassword,
    repeatPassword: validateRePassword,
    register: validateRegister,
    login: validateLogin
}

export default validations