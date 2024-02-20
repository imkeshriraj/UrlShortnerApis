const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/url-shortener')

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        await mongoose.connect('mongodb+srv://adityabkrajs:Msdhoni7@url-shortner.qi3ac81.mongodb.net/URL-Shortner?retryWrites=true&w=majority)
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed " + error )
    }
}

module.exports = connectDB
