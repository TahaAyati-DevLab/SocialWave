const yup = require("yup")

exports.registerValidatorSchema = yup.object({
    email:yup.string().email("The email address must be valid.").required("The email must not be empty."),
    username:yup.string().min(3,"The username must be at least 3 characters long.").required("The username must not be empty."),
    name:yup.string().min(3,"he name must be at least 3 characters long.").max(50,"Your name must not exceed 50 characters.").required("The name must not be empty."),
    password:yup.string().min(8,"he password must be at least 8 characters long.").required("The password must not be empty.")    
})