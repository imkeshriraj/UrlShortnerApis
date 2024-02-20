const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/url-shortener')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed " + error )
    }
}

module.exports = connectDB
