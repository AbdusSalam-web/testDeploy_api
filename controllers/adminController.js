const User = require("../models/userModel");
const Service = require("../models/servicesModel");
const getAllUser = async (req, res, next) => {
  try {
    const result = await User.find({}, { password: 0 });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Page not found." });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await User.findOne({ _id: id }).select("-password");

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const editUserById = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await User.updateOne({ _id: id }, { $set: data });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.deleteOne({ _id: id });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// services
const getAllService = async (req, res, next) => {
  try {
    const result = await Service.find({});
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Service.findById({ _id: id });
    console.log("🚀 ~ getServiceById ~ result:", result);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const editServiceById = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  console.log("🚀 ~ editServiceById ~ data:", data);
  try {
    const result = await Service.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true },
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getAllService,
  editUserById,
  deleteUser,
  getUserById,
  deleteServiceById,
  getServiceById,
  editServiceById,
};
