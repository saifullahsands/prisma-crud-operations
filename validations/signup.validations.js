const joi=require("joi")

const SignupSchema=joi.object({
    username:joi.string()
    .min(4)
    .required()
    .messages({
        "string.base":"",
        "string.min":"username must be at least 4 character",
        "any.required":"username is required"
    }),
   email:joi.string()
    .email()
    .required()
    .messages({
        "string.base":"email is must be a string",
        "string.email":"email must be a valid",
        "any.required":"username is required"
    }),
    password:joi.string()
    .min(5)
    .required()
    .messages({
        "string.base":"password must be a string",
        "string.min":"password must at least 5 character ",
        "any.required":"password is required"
    })

})

module.exports=SignupSchema
