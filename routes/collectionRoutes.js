const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {
  createCollectionSchema,
  getCollectionsSchema,
  updateCollectionSchema,
  deleteCollectionSchema,
} = require("../schemas/collectionSchema");

const {
  createCollection,
  getMyCollections,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

router.post(
  "/createCollection",
  authMiddleware,
  validate(createCollectionSchema),
  createCollection
);

router.post(
  "/getCollections",
  authMiddleware,
  validate(getCollectionsSchema),
  getMyCollections
);

router.post(
  "/updateCollection",
  authMiddleware,
  validate(updateCollectionSchema),
  updateCollection
);

router.post(
  "/deleteCollection",
  authMiddleware,
  validate(deleteCollectionSchema),
  deleteCollection
);

module.exports = router;