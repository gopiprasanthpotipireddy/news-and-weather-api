
const axios= require('axios')
const APP_CACHE = require('../config/cache')


const processWeatherResponse = (weather_updates)=>{
    let forecast_temps=weather_updates.list.map(weather_update=>{
        return {
            date:new Date(weather_update.dt_txt).toDateString(),
            date_time:new Date(weather_update.dt_txt).toString(),
            main:weather_update.weather[0].main,
            temp:weather_update.main.temp
        }
    })

    return {count:forecast_temps.length,data:forecast_temps}
}

const addForecastToCache = async (city,forecast) => {
    return APP_CACHE.set(city, forecast,3600)
}
const getForecastFromCache = async (city) => {
    return APP_CACHE.get(city)
}

exports.getWeatherForecast = async (city)=>{
    let forecast=await getForecastFromCache(city)

    if(forecast == undefined){
        try{
            const param_config={
                url:`${process.env.WEATHER_API_URL}/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.WEATHER_API_TOKEN}`,
                method:'get',
                headers:{
                    "content-type":"application/json",
                }
                      
            }
            const {data}=await axios(param_config)
            forecast={...processWeatherResponse(data),location:city,unit:'metric'}
            await addForecastToCache(city,forecast)
            return forecast
        }
        catch(err){
            console.log(err)
            throw err
        }
    }
    return forecast

}