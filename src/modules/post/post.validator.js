const yup = require("yup");

const postUploadValidation = yup.object({
    description: yup
        .string()
        .max(2200, "Description cannot exceed 2200 characters.")
        .nullable(),
});

module.exports = { postUploadValidation };