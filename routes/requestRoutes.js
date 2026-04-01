const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { createRequestSchema ,updateRequestSchema,executeRequestSchema } = require("../schemas/requestSchema");
const {
  saveRequest,
  filterRequests,
  updateRequest,
  deleteRequest,
  executeRequest
} = require("../controllers/requestController");

router.post("/createRequest", authMiddleware, validate(createRequestSchema), saveRequest);
router.post("/filterRequest", authMiddleware, filterRequests);
router.put("/updateRequest", authMiddleware, validate(updateRequestSchema), updateRequest);
router.delete("/deleteRequest", authMiddleware, deleteRequest);
router.post("/executeRequest",authMiddleware,validate(executeRequestSchema),executeRequest);

module.exports = router;