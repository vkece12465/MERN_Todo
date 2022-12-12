// For DB connection need a mongoose
import mongoose from 'mongoose';

// Your url coming from .enf file or write a custom url port number
const MONGO_URL = process.env || 4000;

const dbConnection = () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    // Logging for the success connection
    .then((connect) => {
        console.log(`Your MongoDB connection is success and running at ${connect.connection.host}`)
    })

    // Logging for failure connection
    .catch((err) => {
        console.log(err, "Your mongoDB connection is failed")
    })
}

// Finally exporting your DB module and you can import anywhere in the project
module.exports = dbConnection;