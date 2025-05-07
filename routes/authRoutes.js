const express=require("express")
const { validationMiddlewareError } = require("../middlewares/validation.middleware")
const  SignupSchema  = require("../validations/signup.validations")
const { registerUser, login, sendOtp, verifyOtpAndChangePassword } = require("../controllers/auth.controller")
const loginSchema = require("../validations/login.validation")
const OtpVerificationSchem=require("../validations/otp.validation")
const authRoutes=express.Router()

authRoutes.post("/register",validationMiddlewareError(SignupSchema),registerUser)
authRoutes.post("/login",validationMiddlewareError(loginSchema),login)
authRoutes.patch("/otp",sendOtp)
authRoutes.patch("/verify-otp",validationMiddlewareError(OtpVerificationSchem),verifyOtpAndChangePassword)

module.exports=authRoutes