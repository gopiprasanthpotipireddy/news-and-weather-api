const handleError = (err,req,res,next)=>{

    res.status(err.statusCode || 500).json({
        error:err.message||'INTERNAL ERROR',
        status:'FAIL'
    })
    next()
    
}



module.exports=handleError