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

const deletePost=async(req,res,next)=>{
    try {
        const{id}=req.params
        const UserId=req.user?.id
    const deletepost=  await prisma.post.delete({
            where:{
                userId:UserId,
                id:parseInt(id)
            }
        }) 

        okResponse(res,200,`post delete successfully`,deletepost)
    } catch (error) {
        console.log(`error in delete post :: ${error}`)
        next(error)
    }
}

const updatePost=async(req,res,next)=>{
    try {
        const {caption}=req.body;
        const{id}=req.params
        const UserId=req.user?.id
        const updatedpost=  await prisma.post.update({
            where:{
                id:parseInt(id),
                userId:UserId
            },
            data:{
                caption
            }
        })
        okResponse(res,200,"post update successfully ",updatedpost)

    } catch (error) {
        console.log(`error in update post caption :: ${error}`)
        next(error)
    }
}

const getAllUserPost=async(req,res,next)=>{
    try {
      
        const UserId=req.user?.id
        const getPosts=await prisma.post.findMany({
            where:{
                userId:UserId,
            },
            include:{
                PostImages:{
                    select:{
                        urls:true
                    }
                },
                _count:{
                    select:{
                        Comments:true,
                        Likes:true
                    }
                },
                Comments:{
                    select:{
                        content:true,
                        User:{
                            select:{
                                username:true
                            }
                        }
                    },

                }
            }
            })
            okResponse(res,200,"get all post witb like comments ",getPosts)
    } catch (error) {
        console.log(`error in get All post :: ${error} `)
        next(error)
    }
}

const getAllPosts=async(req,res,next)=>{
    try {
        const allposts=await prisma.post.findMany({
           select:{
            id:true,
            caption:true,
            User:{
                select:{
                    username:true
                }
            },
            PostImages:{
                select:{urls:true}
            },
            _count:{
                select:{
                    Likes:true,
                    Comments:true
                }
            }
           },
           orderBy:{
            createdAt:"desc"
           }
           
        })
        okResponse(res,200,"all post retrieve successfully ",allposts)
    } catch (error) {
        console.log(`error in all posts :: ${error.message}`)
        next(error)
    }
}



module.exports={
    createPost,
    deletePost,
    updatePost,
    getAllUserPost,
    getAllPosts
}