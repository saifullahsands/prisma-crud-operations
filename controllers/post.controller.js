const prisma = require("../utils/helper/prisma.client");
const { handleS3Upload }=require("../utils/helper/s3Upload")
const {BadRequestError }=require("../customError")
const { okResponse}=require("../utils/helper/handlerError")


const createPost=async(req,res,next)=>{
    try {
        const {caption}=req.body;
        const UserId=req.user?.id
        const createPost=await prisma.post.create({
            data:{
                caption,
                userId:UserId
            }
        })


        if(!req.files || req.files.length===0){
            throw new BadRequestError("file is missing")
        }

        console.log("files array ::",req.files)
        
        Promise.all(req.files.map(async(file)=>{
            const folder="feed"
            const fileName=file.originalname
            const uploadResult=await handleS3Upload(fileName,file,folder)
            await prisma.postImage.createMany({
                data:{
                    urls:uploadResult,
                    postId:createPost.id,
                    
                }
            })
        }))
        okResponse(res,201,"created post successfully !!",createPost)
    
    } catch (error) {
        console.log(`error in create post :: ${error.message}`)
        next(error)
    }
}

module.exports={
    createPost
}