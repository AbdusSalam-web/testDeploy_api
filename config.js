require("dotenv").config({ path: "./.env" });
module.exports = {
    mongoUri :process.env.ATLAS_URI,
    dbName: process.env.DB_NAME,
    jwtKey: process.env.TOKEN_KEY,
    port: process.env.PORT
}

