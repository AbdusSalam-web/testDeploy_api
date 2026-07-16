const express = require("express");
const { postService } = require("../controllers/serviceController");

const Router = express.Router();

Router.route("/services").post(postService);

module.exports = Router;