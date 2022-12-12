// Creating a Server
const app = require("./app");
const dbConnection = require("./config/dbConnection.config");
const PORT = process.env || 4000;

// Immediate DB Connection
dbConnection();

app.listen(PORT, () => {
    try {
        console.log(`Connected succefully and running at http://localhost/${PORT}`)
    } catch (err) {
        console.log(err, "Your connection failed to connect");
    }
})