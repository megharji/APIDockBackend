const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  getHistorySchema,
  deleteHistorySchema,
} = require("../schemas/historySchema");
const {
  getMyHistory,
  deleteHistory,
} = require("../controllers/historyController");

router.post("/getHistory", authMiddleware, validate(getHistorySchema), getMyHistory);
router.post("/deleteHistory", authMiddleware, validate(deleteHistorySchema), deleteHistory);

module.exports = router;