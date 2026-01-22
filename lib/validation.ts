import { z } from "zod";

export const hotelSchema = z.object({
  name: z.string().min(2, "Name is required"),
  driveUrl: z.string().url("Invalid URL"),
  destination: z.enum(["ANTALYA", "BODRUM", "FETHIYE", "CRETE"])
});
