import * as yup from "yup"

function makeBlueprint(value) {
    const values = {
        title: yup.string()
            .min(4, "Title must be at least 4 symbols long")
            .required("Title is required"),
        description: yup.string()
            .min(4, "Description must be at least 4 symbols long")
            .required("Description is required"),
    }

    return values[value]
}

function validateTitle({title}){
    const titleBlueprint = makeBlueprint("title")
    const titleSchema = yup.object({
        title: titleBlueprint
    })

    return titleSchema.validate({title})
}

function validateDescription({description}){
    const descriptionBlueprint = makeBlueprint("description")
    const descriptionSchema = yup.object({
        description: descriptionBlueprint
    })

    return descriptionSchema.validate({description})
}

function validateBug({title, description}){
    const titleBlueprint = makeBlueprint("title")
    const descriptionBlueprint = makeBlueprint("description")
    const bugSchema = yup.object({
        title: titleBlueprint,
        description: descriptionBlueprint
    })

    return bugSchema.validate({title, description})
}


const validations = {
    title: validateTitle,
    description: validateDescription,
    bug: validateBug
}

export default validations