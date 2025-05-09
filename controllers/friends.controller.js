const { BadRequestError } = require("../customError")
const { prisma, okResponse } = require("../utils")

const addFriends=async(req,res,next)=>{
    try {
        const SenderId=req.user?.id
        const {recieverId}=req.params
        if(!recieverId){
            throw new BadRequestError("reciever id is require")
        }
        if(SenderId ===parseInt(recieverId)){
            throw new BadRequestError("you cannot send a friend request to yourself")
        }
        const existingFriends=await prisma.friend.findFirst({
            where:{
                senderId:SenderId,
                receiverId:parseInt(recieverId)
            }
        })
        if(existingFriends){
            throw new BadRequestError("Friend request already sent or friendship already exists")
        }
        const friendRequest=await prisma.friend.create({
            data:{
                senderId:SenderId,
                receiverId:parseInt(recieverId),
                status:"PENDING"
            }
        })
        okResponse(res,201,"friend request send Successfully !! ",friendRequest)
    } catch (error) {
        console.log(`error in add friends :: ${error.message}`)
        next(error)
    }
}

const cancelFriend=async(req,res,next)=>{
    try {
        const SenderId=req.user?.id
        const {receiverId}=req.params;
        const cancelfriend=await prisma.friend.findFirst({
            where:{
                senderId:SenderId,
                receiverId:parseInt(receiverId)
            }
        })
        if(!cancelfriend){
            throw new BadRequestError("Friend request not found or already processed. ")
        }
        const DeleteFriendAndRequest=await prisma.friend.delete({
            where:{
                id:cancelfriend.id
            }
        })
        okResponse(res,200,"friend Request cancel successfully ||  ",DeleteFriendAndRequest)
    } catch (error) {
        console.log(`error in cancel Request :: ${error.message}`)
        next(error)
    }
}

const acceptedFriendRequest=async(req,res,next)=>{
    try {
        const receiverId=req.user?.id
        const {senderId}=req.params

        const friendRequest=await prisma.friend.findFirst({
            where:{
                senderId:parseInt(senderId),
                receiverId:parseInt(receiverId),
                status:"PENDING"
            }
        })
        if(!friendRequest){
            throw new BadRequestError("No pending friend request found from this user.")
        }
        const updateRequest=await prisma.friend.update({
            where:{
                id:friendRequest.id
            },
            data:{
                status:"ACCEPTED"
            }
        })
        okResponse(res,200,"friend request accept successfully",updateRequest)
    } catch (error) {
        console.log(`error in accept firend request :: ${error.message}`)
        next(error)
    }
}
module.exports={
    addFriends,
    cancelFriend,
    acceptedFriendRequest
}