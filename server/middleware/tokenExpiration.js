const { jwt } = require("jsonwebtoken");
const { jwtKey } = require("../config");

const verifyToken = async() =>{
    try {
        const decoded = await jwt.verify('token',jwtKey)
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
