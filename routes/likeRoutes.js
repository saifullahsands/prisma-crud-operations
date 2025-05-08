const express=require("express")
const likeRoutes=express.Router()
const { authenticated}=require("../middlewares/auth.middleware")
const { toggleLike, getAllLike } = require("../controllers/like.controller")


likeRoutes.post("/toggle-like/:id",authenticated,toggleLike)
likeRoutes.get("/get-all-like/:id",authenticated,getAllLike)



module.exports=likeRoutes