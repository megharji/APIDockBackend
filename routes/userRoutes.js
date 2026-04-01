const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");

router.get("/GetProfileData", authMiddleware, getProfile);
router.put("/UpdateUserProfile", authMiddleware, updateProfile);

module.exports = router;