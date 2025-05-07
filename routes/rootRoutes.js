const express = require("express")
const rootRoutes = express.Router()
const authRoutes = require("./authRoutes")
const postRoutes=require("./postRoutes")

rootRoutes.use("/user", authRoutes)
rootRoutes.use("/post",postRoutes)


module.exports = rootRoutes