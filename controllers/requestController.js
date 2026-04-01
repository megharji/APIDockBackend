const requestModel = require("../models/requestModel");
const axios = require("axios");

const saveRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const {   collection_id = null,title, method, url, headers = {}, body = {} } = req.body;

    const result = await requestModel.createRequest(
      userId,
      title,
        collection_id,
      method.toUpperCase(),
      url,
      headers,
      body
    );

    return res.status(201).json({
      success: true,
      message: "Request saved successfully",
      request: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const filters = req.body;   // 👈 dynamic

    const result = await requestModel.filterRequests(userId, filters);

    return res.status(200).json({
      success: true,
      count: result.rows.length,   // 👈 useful
      requests: result.rows,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRequest = async (req, res) => {
  try {
    const userId = req.user.id;
   const { id, title, method, url, headers, body, collection_id } = req.body;

    // pehle existing data lo
    const existing = await requestModel.getRequestById(id, userId);

    if (existing.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const oldData = existing.rows[0];

    // merge karo (jo diya hai wahi update)
    const updatedData = {
      title: title ?? oldData.title,
      method: method ?? oldData.method,
      url: url ?? oldData.url,
      headers: headers ?? oldData.headers,
      body: body ?? oldData.body,
      collection_id: collection_id ?? oldData.collection_id,
    };

    const result = await requestModel.updateRequestById(
      id,
      userId,
      updatedData.title,
      updatedData.method,
      updatedData.url,
      updatedData.headers,
      updatedData.body,
      updatedData.collection_id
    );

    return res.status(200).json({
      success: true,
      message: "Request updated successfully",
      request: result.rows[0],
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Request id is required",
      });
    }

    const result = await requestModel.deleteRequestById(id, userId);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Request not found or not yours",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const executeRequest = async (req, res) => {
  try {
    const { method, url, headers = {}, body = {} } = req.body;

    const response = await axios({
      method: method.toLowerCase(),
      url,
      headers,
      data: body,
      validateStatus: () => true,
    });

    return res.status(200).json({
      success: true,
      message: "Request executed successfully",
      result: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveRequest,
  filterRequests,
  updateRequest,
  deleteRequest,
  executeRequest
};