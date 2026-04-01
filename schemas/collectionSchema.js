const { z } = require("zod");

const createCollectionSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
});

const getCollectionsSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
});

const updateCollectionSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1, "Collection name is required"),
});

const deleteCollectionSchema = z.object({
  id: z.coerce.number(),
});

module.exports = {
  createCollectionSchema,
  getCollectionsSchema,
  updateCollectionSchema,
  deleteCollectionSchema,
};