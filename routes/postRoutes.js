const express = require("express")
const postRoutes = express.Router()
const { authenticated } = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")
const { createPost } = require("../controllers/post.controller")

postRoutes.post("/create", authenticated, upload.array("images"), createPost)


module.exports = postRoutes