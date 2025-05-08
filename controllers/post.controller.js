const {BadRequestError }=require("../customError")
const { okResponse,handleS3Upload,prisma }=require("../utils/index")



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
    const deletepost =  await prisma.post.findFirst({
            where:{
                userId:UserId,
                id:parseInt(id)
            }
        }) 
        if(!deletepost){
            throw new BadRequestError("sorry you are not deleted this post")
        }
        await prisma.post.delete({
            where:{
                id:deletepost.id
            }
        })
        okResponse(res,200,`post delete successfully`)
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
       const page=parseInt(req.query.page);
        const perPage=parseInt(req.query.PerPageRecord) || 5;
        const skip=(page-1) * perPage 
        const allposts=await prisma.post.findMany({
            skip:skip,
            take:perPage,
           select:{
            id:true,
            caption:true,
            User:{
                select:{
                    username:true
                }
            },
            PostImages:{
                select:{
                    urls:true
                }
            },
            _count:{
                select:{
                    Likes:true,
                    Comments:true
                }
            }
           },
           orderBy:{
            createdAt:"asc"
           }
           
        })
        const totalPosts = await prisma.post.count();
        okResponse(res,200,"all post retrieve successfully ",allposts,{totalPages: Math.ceil(totalPosts / perPage)})
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