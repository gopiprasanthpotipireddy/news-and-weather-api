const { db } = require("../config/database")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ApiError = require("../utils/error")

exports.registerUserService = async (email, username, password) => {

    const exists = await checkIfUserExists(email)
    if (exists)
        throw new ApiError('User Already Exists with this email', 409)
    let password_hash = await bcrypt.hash(password, 10)
    await saveUser(email, username, password_hash)
    
    return {username,token:createApiToken(email)}
}

const createApiToken = (email) => {
    return jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    )
}

const saveUser = async (email, username, password) => {
    try {
        const query = `INSERT INTO users(email,username,password) VALUES($1,$2,$3) ON CONFLICT(email) DO NOTHING`
        await db.query(query, [email, username, password])
        return
    } catch (err) {
        console.log({ message: err.message, error: err })
        throw new ApiError('Error Resgistering User', 500)
    }
}

const checkIfUserExists = async (email) => {
    const query = `SELECT password FROM users WHERE email= '${email}'`
    const users = await db.query(query)
    console.log(users)
    if (users.length)
        return users[0].password
    return false
}

exports.loginUserService=async (email,password)=>{

    let password_hash=await checkIfUserExists(email)
    console.log(password_hash)
    if(password && (await bcrypt.compare(password,password_hash))){
        return {email,token:createApiToken(email)}
    }
    throw new ApiError('Entered Email or Password is Wrong',401)
}

