

const prisma = require("../utils/helper/prisma.client")

const ConnectionDatabase=async()=>{
    try {
        await prisma.$connect()
        console.log(`database connected successfully !!`)
    } catch (error) {
        console.log(`error in Connection Database :: ${error.message}`)
        await prisma.$disconnect()
        process.exit(1)
    }
}

module.exports={
    ConnectionDatabase
}