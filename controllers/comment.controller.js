const { BadRequestError } = require("../customError");
const { okResponse,prisma}=require("../utils/index")


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
        if(!getAllComments || getAllComments.length===0){
            throw new BadRequestError("comment is null value")
        }
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