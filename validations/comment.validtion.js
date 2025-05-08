const joi=require("joi")

const commentSchema=joi.object({
    content:joi.string()
    .required()
    .min(4)
    .messages({
        "string.base":"comment must be a string",
        "any.required":"comment is required",
        "string.min":"comment must be at least 4 character"
    })
})

module.exports=commentSchema