import { z } from 'zod';

export const createPrizeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),

  type: z.enum(['coins', 'freeSpin', 'bonus']),

  amount: z.coerce
    .number()
    .positive('Amount must be positive'),

  imageUrl: z
    .string()
    .min(1, 'Image URL is required')
    .url('Image URL must be valid'),
});

export type CreatePrizeFormInput = z.input<typeof createPrizeSchema>;
export type CreatePrizeFormValues = z.output<typeof createPrizeSchema>;