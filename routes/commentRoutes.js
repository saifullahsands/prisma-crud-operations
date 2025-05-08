const express=require("express")
const { authenticated } = require("../middlewares/auth.middleware")
const { validationMiddlewareError } = require("../middlewares/validation.middleware")
const commentSchema=require("../validations/comment.validtion")
const commentRoutes=express.Router()
const {createComment,updateComment,deleteComment,getAllComment}=require("../controllers/comment.controller")


commentRoutes.post('/create/:id',authenticated,validationMiddlewareError(commentSchema),createComment)
commentRoutes.patch("/update/:id/:CommentId",authenticated,validationMiddlewareError(commentSchema),updateComment)
commentRoutes.delete("/delete/:id/:CommentId",authenticated,deleteComment)
commentRoutes.get("/get-all-comments",authenticated,getAllComment)

module.exports=commentRoutes