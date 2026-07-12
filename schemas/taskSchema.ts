import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().optional(),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),

  status: z.enum([
    "todo",
    "in_progress",
    "done",
  ]),

  due_date: z.string(),
});

export type TaskFormData = z.infer<typeof taskSchema>;