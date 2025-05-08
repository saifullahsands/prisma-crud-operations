const JWT = require("jsonwebtoken")
const { TOKEN_SECRET_KEY } = require("../config/env.config")
const { unAuthorizedError, BadRequestError } = require("../customError")
const prisma =require("../utils/helper/prisma.client")


const authenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers
        if (!req.headers || !authHeader.startsWith("Bearer ")) {
            throw new unAuthorizedError("authorization header is missing")

        }
        const token=authHeader.replace("Bearer ","").trim()
        const decode=JWT.verify(token,TOKEN_SECRET_KEY)
        const user=await prisma.user.findUnique({
            where:{
                id:decode.id
            }
        })
        if(!user){
            throw new BadRequestError("invalid user ")
        }
        req.user=user
        next()
    } catch (error) {
        if (error instanceof JWT.JsonWebTokenError){
            console.log(error.message)
            throw new unAuthorizedError(error.message)

        }
        else{
            console.log(`error in authentication middleware :: ${error.message}`)
            next(new BadRequestError(error.message))
        }
    }
}

module.exports={
    authenticated
}