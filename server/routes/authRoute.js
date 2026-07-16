const express = require("express");
const Router = express.Router();
const { register, login, user } = require("../controllers/authController");
const { signUpSchema } = require("../validator/authValidator");
const validate = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");


Router.route("/register").post(validate(signUpSchema), register);
Router.route("/login").post(login);
Router.route("/user").get(authMiddleware, user);
module.exports = Router;
