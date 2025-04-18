
const { z } = require("zod");

const upvoteSchema = z.object({
  body: z.object({
    complaintId: z.string().min(1, "Complaint ID is required"),
  }),
});

module.exports = { upvoteSchema };