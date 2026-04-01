const historyModel = require("../models/historyModel");

const getMyHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = req.body || {};

    const result = await historyModel.filterHistory(userId, filters);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      history: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const result = await historyModel.deleteHistoryById(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "History not found or not yours",
      });
    }

    return res.status(200).json({
      success: true,
      message: "History deleted successfully",
      history: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyHistory,
  deleteHistory,
};