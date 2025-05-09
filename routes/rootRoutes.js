const express = require("express")
const rootRoutes = express.Router()
const authRoutes = require("./authRoutes")
const feedRoutes = require("./feedRoutes")


rootRoutes.use("/user", authRoutes)
rootRoutes.use("/feed",feedRoutes)



module.exports = rootRoutes