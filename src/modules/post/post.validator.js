const yup = require("yup");

const postUploadValidation = yup.object({
    description: yup
        .string()
        .max(2200, "Description cannot exceed 2200 characters.")
        .nullable(),

    hashTags: yup
        .string()
        .min(2, "Hashtag must be at least 2 characters.")
        .required("Hashtags field is required."),

    media: yup
        .string()
        .required("Media is required.")
});

module.exports = { postUploadValidation };