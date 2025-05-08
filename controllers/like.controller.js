const { okResponse } = require("../utils/helper/handlerError");
const prisma = require("../utils/helper/prisma.client");

const toggleLike = async (req, res, next) => {
    try {
        const { id } = req.params
        const UserId = req.user?.id
        const ExistingLike = await prisma.like.findFirst({
            where: {
                userId: UserId,
                postId: parseInt(id)
            }
        })
        if (ExistingLike) {
            const Unliked = await prisma.like.delete({
                where: {
                    id: ExistingLike.id
                }
            })
            return okResponse(res, 200, "post unliked successfully", Unliked)
        }
        else {
            const Liked = await prisma.like.create({
                data: {
                    userId: UserId,
                    postId: id
                }
            })
            return okResponse(res, 200, "post liked successfully", Liked)
        }
    } catch (error) {
        console.log(`error in create Likes :: ${error.message}`)
        next(error)
    }
}

const getAllLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const UserId = req.user?.id
        const AllLike = await prisma.like.findMany({
            where: {
                postId: id,
                userId: UserId
            },
            include: {
                Post: {
                    include: {
                        PostImages: {
                            select: {
                                urls: true
                            }
                        }
                    }
                }
            }
        })
        okResponse(res, 200, "get all likes retrieve successfully ", AllLike)
    } catch (error) {
        console.log(`error in create Likes :: ${error.message}`)
        next(error)
    }
}

module.exports = {
    getAllLike,
    toggleLike
}