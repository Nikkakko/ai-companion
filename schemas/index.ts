import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),

  description: z.string().min(1, {
    message: 'Description is required',
  }),

  instructions: z.string().min(200, {
    message: 'Instructions must be at least 200 characters',
  }),
  seed: z.string().min(200, {
    message: 'Seed must be at least 200 characters',
  }),

  src: z.string().min(1, {
    message: 'Image is required',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required',
  }),
});
