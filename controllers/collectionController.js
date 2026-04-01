const collectionModel = require("../models/collectionModel");

const createCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const result = await collectionModel.createCollection(userId, name);

    return res.status(201).json({
      success: true,
      message: "Collection created successfully",
      collection: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyCollections = async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = req.body || {};

    const result = await collectionModel.filterCollections(userId, filters);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      collections: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, name } = req.body;

    const result = await collectionModel.updateCollectionById(id, userId, name);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Collection not found or not yours",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      collection: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const result = await collectionModel.deleteCollectionById(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Collection not found or not yours",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
      collection: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCollection,
  getMyCollections,
  updateCollection,
  deleteCollection,
};