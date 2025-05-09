const express = require("express")
const feedRoutes = express.Router()
const upload = require("../middlewares/multer.middleware")
const { createPost, deletePost, getAllUserPost, updatePost, getAllPosts, searchPost } = require("../controllers/post.controller")
const { validationMiddlewareError } = require("../middlewares/validation.middleware")
const postSchema = require("../validations/post.validation")
const { createComment, updateComment, deleteComment, getAllComment } = require("../controllers/comment.controller")
const { authenticated } = require("../middlewares/auth.middleware")
const { toggleLike, getAllLike } = require("../controllers/like.controller")
const commentSchema = require("../validations/comment.validtion")
const { addFriends, cancelFriend, acceptedFriendRequest } = require("../controllers/friends.controller")


// post routes
feedRoutes.post("/post/create", authenticated, upload.array("images"), validationMiddlewareError(postSchema), createPost)
feedRoutes.delete("/post/delete/:id", authenticated, deletePost)
feedRoutes.patch("/post/update/:id", authenticated, validationMiddlewareError(postSchema), updatePost)
feedRoutes.get("/get-all-user-post", authenticated, getAllUserPost)
feedRoutes.get("/get-all-post", authenticated, getAllPosts)


// like routes
feedRoutes.post("/toggle-like/:id", authenticated, toggleLike)
feedRoutes.get("/get-all-like", authenticated, getAllLike)

// comment routes

feedRoutes.post('/comment/create/:id', authenticated, validationMiddlewareError(commentSchema), createComment)
feedRoutes.patch("/comment/update/:id/:CommentId", authenticated, validationMiddlewareError(commentSchema), updateComment)
feedRoutes.delete("/comment/delete/:id/:CommentId", authenticated, deleteComment)
feedRoutes.get("/get-all-comments", authenticated, getAllComment)
feedRoutes.get("/postsearch", authenticated, searchPost)


// friend routes

feedRoutes.post("/add-friends/:recieverId", authenticated, addFriends)
feedRoutes.delete("/cancel-friend-request/:receiverId", authenticated, cancelFriend)
feedRoutes.patch("/accept-friend-request/:senderId", authenticated, acceptedFriendRequest)


module.exports = feedRoutes