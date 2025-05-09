const pagination=(req)=>{
      const page=parseInt(req.query.page) || 1;
        const perPage=parseInt(req.query.PerPageRecord) || 10;
        const skip=(page-1) * perPage 
        return {skip,perPage}
}
module.exports={
    pagination
}