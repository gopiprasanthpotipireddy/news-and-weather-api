const express = require('express')
const handleError = require('./src/middleware/error-handler')
const api_router = require('./src/routes/index')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use('/',api_router)
app.use(handleError)

module.exports=app
