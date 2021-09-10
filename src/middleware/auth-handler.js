const jwt = require("jsonwebtoken")
const ApiError = require("../utils/error")

exports.verifyToken = (req, res, next) => {

    if(process.env.NODE_ENV=='TEST')
        return next()
    const token = req.headers["x-access-token"]
    if (!token)
        return next(new ApiError('Token is missing in headers pleaset set "x-access-token"', 403))

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded
    }catch(err){
        console.log(err)
        return res.status(401).json({message:'Invalid Token'})
    }
    return next()

}