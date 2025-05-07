const joi=require("joi")

const OtpVerificationSchema=joi.object({
    otp: joi.number()
    .integer()
    .min(100000)
    .max(999999)
    .required()
    .messages({
      "number.base": "OTP must be a number",
      "number.min": "OTP must be a 6-digit number",
      "number.max": "OTP must be a 6-digit number",
      "any.required": "OTP is required"
    }),
  
  newPassword: joi.string()
    .required()
    .min(6)
    .messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required"
    })
})

module.exports=OtpVerificationSchema