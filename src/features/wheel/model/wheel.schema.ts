import { z } from "zod";

const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

export const wheelSegmentSchema = z
  .object({
    id: z.string().min(1),
    label: z
      .string()
      .min(1, "Segment label is required")
      .max(50, "Segment label must be at most 50 characters"),
    color: z
      .string()
      .regex(hexColorRegex, "Segment color must be a valid hex color"),
    weight: z.coerce
      .number()
      .int("Weight must be an integer")
      .min(1, "Weight must be at least 1")
      .max(100, "Weight must be at most 100"),
    prizeType: z.enum(["coins", "freeSpin", "bonus", "nothing"]),
    prizeAmount: z.coerce.number().min(0, "Prize amount must be at least 0"),
    imageUrl: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.prizeType === "nothing" && data.prizeAmount !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["prizeAmount"],
        message: "Prize amount must be 0 when prize type is nothing",
      });
    }

    if (data.prizeType !== "nothing" && data.prizeAmount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["prizeAmount"],
        message: "Prize amount must be greater than 0",
      });
    }
  });

export const createWheelSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(80, "Name must be at most 80 characters"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["draft", "active", "inactive"]),
    segments: z
      .array(wheelSegmentSchema)
      .min(2, "Minimum 2 segments required")
      .max(12, "Maximum 12 segments allowed"),
    maxSpinsPerUser: z.coerce
      .number()
      .int("Max spins per user must be an integer")
      .min(1, "Max spins per user must be at least 1"),
    spinCost: z.coerce
      .number()
      .min(0, "Spin cost must be a non-negative number"),
    backgroundColor: z
      .string()
      .regex(hexColorRegex, "Background color must be a valid hex color"),
    borderColor: z
      .string()
      .regex(hexColorRegex, "Border color must be a valid hex color"),
  })
  .superRefine((data, ctx) => {
    const totalWeight = data.segments.reduce(
      (sum, segment) => sum + segment.weight,
      0,
    );

    if (totalWeight !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["segments"],
        message: "All segment weights must sum to exactly 100",
      });
    }
  });

export type CreateWheelFormInput = z.input<typeof createWheelSchema>;
export type CreateWheelFormValues = z.output<typeof createWheelSchema>;
