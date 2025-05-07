const { ValidationError } = require("../customError")


const validationMiddlewareError=(schema)=>{
    return async(req,res,next)=>{
        try {
             await schema.validateAsync(req.body)
             next()
        } catch (error) {
           
            const firstError = error.details?.[0]?.message || "Validation failed";
            console.log(`error in validationSchema Error in :: ${firstError}`)
            next(new ValidationError(`${firstError}`))
        }
    }
}

module.exports={validationMiddlewareError}