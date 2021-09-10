const api_router = require('express').Router()
//Request Handlers
const {getNewsFromSourcesHandler} = require('./news-routes')
const {verifyToken}=require('../middleware/auth-handler')
const {getWeatherUpdatesHandler} = require('./weather-routes')
const { registerUserHandler, logInUserHandler } = require('./user-routes')

//Request Routing
api_router.get('/news',verifyToken,getNewsFromSourcesHandler)
api_router.get('/weather',getWeatherUpdatesHandler)
api_router.post('/register',registerUserHandler)
api_router.post('/login',logInUserHandler)

module.exports=api_router