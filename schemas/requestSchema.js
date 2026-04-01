const { z } = require("zod");

const createRequestSchema = z.object({
  collection_id: z.number().nullable().optional(),
  title: z.string().min(1, "Title is required"),
  method: z.string().min(1, "Method is required"),
  url: z.string().url("Invalid URL"),
  headers: z.object({}).catchall(z.any()).optional(),
  body: z.any().optional(),
});

const updateRequestSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(1),
  method: z.string().min(1),
  url: z.string().url(),
  headers: z.record(z.any()).optional(),
  body: z.any().optional(),
  collection_id: z.coerce.number().optional()
});

const executeRequestSchema = z.object({
  request_id: z.coerce.number().optional(),
  method: z.string().min(1, "Method is required"),
  url: z.string().url("Invalid URL"),
  headers: z.record(z.any()).optional(),
  body: z.any().optional(),
});

module.exports = {
  createRequestSchema,updateRequestSchema,executeRequestSchema
};