const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header is missing or invalid.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, jwtKey);

    const user = await User.findOne({
      email: decoded.email,
    }).select("-password");
    

    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    req.user = user;
    req.token = token;
    req.userID = user._id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
