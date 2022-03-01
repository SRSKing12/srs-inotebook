const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(MONGO_URI, ()=>{
        console.log("Connected to Mongo successfully!");
    })
}

module.exports = connectToMongo;
