const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { userName, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    } else {
      const result = await User.create({
        userName,
        email,
        phone,
        password,
      });
      const token = await result.generateToken();
      return res.status(201).json({
        message: "User registration successful",
        token: token,
        userId: result._id.toString(),
      });
    }
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRegistered = await User.findOne({ email });
    if (!userRegistered) {
      return res.status(401).json({ message: "This email is not registered." });
    }
    const validCredential = await bcrypt.compare(
      password,
      userRegistered.password,
    );
    if (!validCredential) {
      return res.status(401).json({ message: "Invalid credentials." });
    } else {
      return res.status(200).json({
        message: "Login successful.",
        token: await userRegistered.generateToken(),
        userID: userRegistered._id.toString(),
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// user
const user = async (req, res, next) => {
  try {
    const userData = req.user;
    
    return res.status(200).json(userData);
  } catch (error) {
    console.log(`Error from user route: ${error}`);
  }
};

module.exports = { register, login, user };
