const { z } = require("zod");

const getHistorySchema = z.object({
  id: z.coerce.number().optional(),
  request_id: z.coerce.number().optional(),
  method: z.string().optional(),
  url: z.string().optional(),
  status_code: z.coerce.number().optional(),
  executed_at: z.string().optional(),
});

const deleteHistorySchema = z.object({
  id: z.coerce.number(),
});

module.exports = {
  getHistorySchema,
  deleteHistorySchema,
};