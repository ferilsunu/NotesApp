const mongoose= require('mongoose')

const connection = mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("Database Connected")
}).catch(error=>console.log(error))

module.exports = connection


