require('dotenv/config');
const mongoose = require("mongoose");

const mongoDBURL = process.env.APP_URL;

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

const dbconnect = mongoose.connection;

dbconnect.on('error' , () => {
    console.error('MongoDB Connection Fail')
})

dbconnect.on('connected' , () => {
    console.error('MongoDB Connection Successful 🚀🤘🔥 ')
})

module.exports = mongoose