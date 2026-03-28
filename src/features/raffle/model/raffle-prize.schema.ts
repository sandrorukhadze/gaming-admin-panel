import { z } from "zod";

export const createRafflePrizeSchema = z.object({
  name: z
    .string()
    .min(1, "Prize name is required")
    .max(100, "Prize name must be at most 100 characters"),
  type: z.enum(["coins", "freeSpin", "bonus"]),
  amount: z.coerce
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  imageUrl: z
    .string()
    .min(1, "Image URL is required")
    .url("Image URL must be valid"),
});

export type CreateRafflePrizeFormInput = z.input<
  typeof createRafflePrizeSchema
>;
export type CreateRafflePrizeFormValues = z.output<
  typeof createRafflePrizeSchema
>;
