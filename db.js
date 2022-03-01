const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Connected to Mongo Successfully !")
    }).catch((err) => {console.log(err)})
}

module.exports = connectToMongo;
