const Service = require("../models/servicesModel");
const postService = async (req, res) => {
  const { service, description, price, provider } = req.body;
  try {
    if (!service || !description || !price || !provider) {
      return res
        .status(400)
        .json({ message: "All filed must be filled properly." });
    }
    const result = await Service.create({
      service,
      description,
      price,
      provider,
    });
    return res.status(201).json({ message: "service added successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postService };
