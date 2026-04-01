const authModel = require("../models/authModel");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await authModel.getUserById(userId);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const result = await authModel.updateUserName(userId, name);

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getProfile,updateProfile };