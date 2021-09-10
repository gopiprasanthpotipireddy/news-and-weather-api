const express = require('express')
const handleError = require('./src/middleware/error-handler')
const api_router = require('./src/routes/index')
const cors = require('cors')
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/',api_router)
app.use(handleError)

module.exports=app
