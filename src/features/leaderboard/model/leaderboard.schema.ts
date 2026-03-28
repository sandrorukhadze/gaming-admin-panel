import { z } from "zod";

export const createLeaderboardSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    status: z.enum(["draft", "active", "completed"]),
    scoringType: z.enum(["points", "wins", "wagered"]),
    prizeId: z.string().min(1, "Prize is required"),
    maxParticipants: z.coerce
      .number()
      .int("Must be an integer")
      .positive("Must be positive")
      .min(2, "Minimum is 2"),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startDate).getTime();
    const end = new Date(data.endDate).getTime();

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date must be after start date",
      });
    }
  });

export type CreateLeaderboardFormInput = z.input<
  typeof createLeaderboardSchema
>;
export type CreateLeaderboardFormValues = z.output<
  typeof createLeaderboardSchema
>;
