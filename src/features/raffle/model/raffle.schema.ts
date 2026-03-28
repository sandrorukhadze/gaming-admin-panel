import { z } from "zod";

export const createRaffleSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(80, "Name must be at most 80 characters"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    drawDate: z.string().min(1, "Draw date is required"),
    status: z.enum(["draft", "active", "drawn", "cancelled"]),
    ticketPrice: z.coerce
      .number()
      .positive("Ticket price must be a positive number"),
    maxTicketsPerUser: z.coerce
      .number()
      .int("Max tickets per user must be an integer")
      .min(1, "Max tickets per user must be at least 1"),
    totalTicketLimit: z.union([z.coerce.number().int().positive(), z.null()]),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startDate).getTime();
    const end = new Date(data.endDate).getTime();
    const draw = new Date(data.drawDate).getTime();

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date must be after start date",
      });
    }

    if (draw <= end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["drawDate"],
        message: "Draw date must be after end date",
      });
    }
  });

export type CreateRaffleFormInput = z.input<typeof createRaffleSchema>;
export type CreateRaffleFormValues = z.output<typeof createRaffleSchema>;
