const {getWeatherForecast} = require('../services/weather-service')

exports.getWeatherUpdatesHandler = async (req,res,next)=>{

    let {city}=req.query
    if(!city)
        city='Bangalore'
    try{
    const forecast=await getWeatherForecast(city)
    return res.status(200).json(forecast)
    }catch(err){
        console.log(err)
        return next(err)
    }
}