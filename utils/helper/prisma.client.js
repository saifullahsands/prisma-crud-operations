

const { PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient({
    log:["query","warn"]
})

module.exports=prisma