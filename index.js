const app=require('./app')
const PORT=process.env.PORT || 9090

app.listen(PORT,err=>{
    if(err){
        console.log({message:`Error Starting the App Server`,error:err.message})
    }
    console.log(`Starting App on ${PORT}`)
})