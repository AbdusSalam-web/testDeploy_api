const mongoose = require("mongoose");
const { mongoUri, dbName } = require("../config");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, { dbName });
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectToDatabase;