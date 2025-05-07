const JWT=require("jsonwebtoken")
const { TOKEN_SECRET_KEY, TOKEN_EXPIRY } = require("../../config/env.config")


const generateToken=async(userId)=>{
    return JWT.sign({
        id:userId
    },
      TOKEN_SECRET_KEY,{
        expiresIn:TOKEN_EXPIRY
      }  
)
}

module.exports={generateToken}