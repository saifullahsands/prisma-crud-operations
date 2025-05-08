const prisma = require("../utils/helper/prisma.client")
const { okResponse}=require("../utils/helper/handlerError")


const createComment=async(req,res,next)=>{
    try {
        const {content}=req.body;
        const {id}=req.params;
        const UserId=req.user?.id
        const createcomment=await prisma.comment.create({
            data:{
                content,
                userId:UserId,
                postId:parseInt(id)
            }
        })
        okResponse(res,201,"comment created successfully",createcomment)
    } catch (error) {
        console.log(`error in create comment :: ${error.message}`)
        next(error)
    }
}

const updateComment=async(req,res,next)=>{
    try {
        const {content}=req.body;
        const {id,CommentId}=req.params;
        const UserId=req.user?.id
        const updatecomment= await prisma.comment.update({
            where:{
                userId:UserId,
                postId:parseInt(id),
                id:parseInt(CommentId)
            },
            data:{
                content
            }
        })
        okResponse(res,200,"comment update successfully",updatecomment)
    } catch (error) {
        console.log(`error in update Comment :: ${error.message}`)
        next(error)
    }
}

const deleteComment=async(req,res,next)=>{
    try {
        const {id,CommentId}=req.params;
        const UserId=req.user?.id
        const deletecomment=await prisma.comment.delete({
            where:{
                userId:UserId,
                postId:parseInt(id),
                id:parseInt(CommentId)
            }
        })
        okResponse(res,200,"delete comment Successfully",deletecomment)
    } catch (error) {
        console.log(`error in delete Comment :: ${error}`)
        next(error)
    }
}

const getAllComment=async(req,res,next)=>{
    try {
        const UserId=req.user?.id
       const getAllComments= await prisma.comment.findMany({
            where:{
                userId:UserId
            },
            include:{
                Post:{
                    include:{
                        PostImages:{
                         select:{
                            urls:true
                         }
                        }
                    }
                }
            }
        })
        okResponse(res,200,"get all comment retrieve successfully",getAllComments)
    } catch (error) {
        console.log(`error in get all comment :: ${error.message}`)
        next(error)
    }
}

module.exports={
    getAllComment,
    deleteComment,
    updateComment,
    createComment
}