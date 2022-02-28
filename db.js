const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect('mongodb+srv://test_user:SRS%40123@srs-inotebook.59nbp.mongodb.net/srs-inotebook?retryWrites=true&w=majority', ()=>{
        console.log("Connected to Mongo successfully!");
    })
}

module.exports = connectToMongo;
