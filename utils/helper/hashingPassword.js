const bcrypt=require("bcrypt")

const HashUserPassword=(password)=>{
    const salt=bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}

const isPasswordCorrect=async(password,userPassword)=>{
    return bcrypt.compareSync(password,userPassword)
}
module.exports={
    HashUserPassword,isPasswordCorrect
}