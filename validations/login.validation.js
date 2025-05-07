const joi=require("joi")

const loginSchema=joi.object({
  
   email:joi.string()
    .email()
    .required()
    .messages({
        "string.base":"email is must be a string",
        "string.email":"email must be a valid",
        "any.required":"username is required"
    }),
    password:joi
    .required()
    .messages({
       "any.required":"password is required"
    })

})

module.exports=loginSchema
