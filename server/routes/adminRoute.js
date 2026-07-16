const express = require("express");
const {
  getAllUser,
  getAllService,
  deleteUser,
  getUserById,
  editUserById,
  deleteServiceById,
  getServiceById,
  editServiceById,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const Router = express.Router();

Router.route("/users").get(authMiddleware, adminMiddleware, getAllUser);
Router.route("/users/delete/:id").delete(
  authMiddleware,
  adminMiddleware,
  deleteUser,
);
Router.route("/user/:id").get(authMiddleware, adminMiddleware, getUserById);
Router.route("/user/edit/:id").patch(
  authMiddleware,
  adminMiddleware,
  editUserById,
);
Router.route("/services").get(authMiddleware, adminMiddleware, getAllService);
Router.route("/service/delete/:id").delete(
  authMiddleware,
  adminMiddleware,
  deleteServiceById,
);
Router.route("/services/:id").get(
  authMiddleware,
  adminMiddleware,
  getServiceById,
);
Router.route("/service/edit/:id").patch(
  authMiddleware,
  adminMiddleware,
  editServiceById,
);
module.exports = Router;
