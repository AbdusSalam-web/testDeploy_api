const adminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const adminRole = user.isAdmin;
    if (!adminRole) {
      return res.status(400).json({ message: "Not allowed to view this module." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = adminMiddleware;
