const express = require("express")
const postRoutes = express.Router()
const { authenticated } = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")
const { createPost, deletePost, getAllUserPost, updatePost, getAllPosts } = require("../controllers/post.controller")
const { validationMiddlewareError }=require("../middlewares/validation.middleware")
const  postSchema=require("../validations/post.validation")

postRoutes.post("/create", authenticated, upload.array("images"),validationMiddlewareError(postSchema), createPost)
postRoutes.delete("/delete/:id",authenticated,deletePost)
postRoutes.patch("/update/:id",authenticated,validationMiddlewareError(postSchema),updatePost)
postRoutes.get("/get-all-user-post",authenticated,getAllUserPost)
postRoutes.get("/get-all-post",authenticated,getAllPosts)

module.exports = postRoutes