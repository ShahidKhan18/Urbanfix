const { z } = require("zod");



// Complaint validation
const complaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  severity: z
    .number()
    .int()
    .min(1, "Severity must be at least 1")
    .max(5, "Severity can’t be more than 5")
    .optional(),
  status: z.enum(["open", "in_progress", "resolved"]).optional(), // Default handled by Mongoose

  wardNumber: z
    .number({ invalid_type_error: "Ward number must be a number" })
    .int("Ward number must be an integer")
    .positive("Ward number must be positive"),

});

module.exports = {
  complaintSchema,
};
