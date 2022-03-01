const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to Mongo Successfully !")
    }).catch((err) => {console.log(err)})
}

module.exports = connectToMongo;
