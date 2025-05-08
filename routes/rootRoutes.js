const express = require("express")
const rootRoutes = express.Router()
const authRoutes = require("./authRoutes")
const postRoutes=require("./postRoutes")
const commentRoutes=require("./commentRoutes")
const likeRoutes=require("./likeRoutes")


rootRoutes.use("/user", authRoutes)
rootRoutes.use("/post",postRoutes)
rootRoutes.use("/comment",commentRoutes)
rootRoutes.use("/like",likeRoutes)



module.exports = rootRoutes