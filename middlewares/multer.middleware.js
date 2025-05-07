const multer=require("multer")
const storage=multer.memoryStorage();

const filterFile=(req,file,cb)=>{
    const allowType=["image/jpg","image/jpeg","image/png"]
    if(allowType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Only .png, .jpg and .jpeg format allowed!"),false)
    }

}
const upload=multer({
    storage:storage,
    fileFilter:filterFile,
    limits:{fileSize: 20 *1024 *1024}
})

module.exports=upload