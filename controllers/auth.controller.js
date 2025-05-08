const prisma = require("../utils/helper/prisma.client")
const { BadRequestError } = require("../customError")
const { smtpServer ,okResponse,generateToken,HashUserPassword,generateOtp, isPasswordCorrect } = require("../utils/index")



const registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        let user = await prisma.user.findUnique({
            where: { email }
        })
        if (user) {
            throw new BadRequestError("user is already exist")
        }

        const hashingPassword = HashUserPassword(password)
        user = await prisma.user.create({
            data: {
                email,
                password: hashingPassword,
                username
            }
        })
        const token = await generateToken(user.id)
        okResponse(res, 201, "user created successfully ", user, token)
    } catch (error) {
        console.log(`error in register user :: ${error.message}`)
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        let user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new BadRequestError("user is not exist")
        }
        const matchPassword =await  isPasswordCorrect(password, user.password)
        if (!matchPassword) {
            throw new BadRequestError('invalid credientials')
        }
        const token =await  generateToken(user.id)
        okResponse(res, 200, "user logged in successfully", user, token)
    } catch (error) {
        console.log(`error in login user :: ${error}`)
        next(error)
    }
}

const sendOtp=async(req,res,next)=>{
   try {
     const otpExpiry=new Date(Date.now()+10*60*1000)
     const {email}=req.body;
     let existingUser=await prisma.user.findUnique({
         where:{email}
     })
     if(!existingUser){
         throw new BadRequestError("invalid credientials :: user is not exist")
     }
     const otp=await generateOtp()
     if(!otp || otp.length===0){
         throw new BadRequestError("otp is not generated ")
     }
     await smtpServer(email,otp)
     await prisma.user.update({
        where:{
            id:existingUser.id
        },
         data:{
             otp:otp,
             otpExpiry
         }
     })
 
     okResponse(res,201,"Otp send Succesfully ",otp)
   } catch (error) {
    console.log(`error in send otp :: ${error.message}`)
    next(error)
   }
}

const verifyOtpAndChangePassword=async(req,res,next)=>{
   try {
     const {otp,newPassword}=req.body;
     let user=await prisma.user.findFirst({
         where:{
             otp:parseInt(otp),
             otpExpiry:{
                 gte:new Date()
             }
         }
     })
     if(!user){
         throw new BadRequestError("user is not existed and otp is invalid")
     }
     const hashingnewPassword=await HashUserPassword(newPassword)
    await prisma.user.update({
        where:{
            id:user.id
        },
         data:{
             otp:0,
             otpExpiry:null,
             password:hashingnewPassword
         }
     })
     okResponse(res,200,"new password is set successfully",)
   } catch (error) {
    console.log(`error in verifyOtp and change password :: ${error}`)
    next(error)
   }
}


module.exports = {
    registerUser,
    login,
    verifyOtpAndChangePassword,
    sendOtp
}