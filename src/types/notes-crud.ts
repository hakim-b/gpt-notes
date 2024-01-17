import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  content: z.string().optional(),
});

export type CreateNote = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().cuid(),
});

export const deleteNoteSchema = z.object({
  id: z.string().cuid(),
});
