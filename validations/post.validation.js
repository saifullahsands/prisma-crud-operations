const joi=require("joi")

const postSchema=joi.object({
    caption:joi.string()
    .required().empty()
    .min(3)
    .messages({
        "string.base":"caption must be string",
        "any.required":"caption in required",
        "string.empty":"caption is not empty",
        "string.min":"caption must be at least 3 character"
    })
})

module.exports=postSchema