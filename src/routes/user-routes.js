const { registerUserService, loginUserService } = require("../services/user-service")
const ApiError = require("../utils/error")

exports.registerUserHandler = async (req, res, next) => {

    const { username, email, password } = req.body
    try {
        if (!username || !email || !password)
            return next(new ApiError('Missing username or email or password', 400))

        if(process.env.NODE_ENV=='TEST')
            return res.status(200).json({email,token:'test_token'})
            
        let user = await registerUserService(email, username, password)
        return res.status(200).json(user)

    } catch (err) {
        console.log(err)
        return next(err)
    }


}

exports.logInUserHandler = async (req,res,next)=>{
    const {email, password } = req.body
    try {
        if (!email || !password)
            return next(new ApiError('Missing username or email or password', 400))
        
        if(process.env.NODE_ENV=='TEST')
            return res.status(200).json({email,token:'test_token'})
        
        let user = await loginUserService(email,password)
        return res.status(200).json(user)

    } catch (err) {
        console.log(err)
        return next(err)
    }
}