const User = require("../Models/User");
exports.getDetailsAdmin = async (req, res) => {
  try {
    const id = req.user.id;
    const details = await User.findById(id);
    if (details) {
      res.status(200).json({
        success: true,
        message: "Details fetched Successfully",
        data: details,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Admin Details fetch error",
      error: err.message,
    });
  }
};

exports.updateDetailsAdmin = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const id = req.user.id;

    const updatedDetails = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedDetails) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User details updated successfully.",
      data: updatedDetails,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "An error occurred while updating user details.",
      error: err.message,
    });
  }
};
exports.getAdminList = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const admins = await User.find({
      role: "admin",
      _id: { $ne: loggedInUserId },
    });

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin list",
      error: error.message,
    });
  }
};
