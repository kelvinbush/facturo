import { z } from "zod";

/**
 * Validation schema for M-Pesa statement file uploads
 * Ensures the file is:
 * - Present
 * - Not empty
 * - A PDF file (based on type or extension)
 */
export const mpesaFileSchema = z.object({
  mpesa: z
    .instanceof(File, { message: "M-Pesa statement file is required" })
    .refine((file) => file.size > 0, {
      message: "File cannot be empty",
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/octet-stream",
          "application/x-pdf",
        ].includes(file.type) || file.name.endsWith(".pdf"),
      {
        message: "Only PDF files are supported",
      },
    ),
});

/**
 * Type for validated M-Pesa file data
 */
export type ValidatedMpesaFile = z.infer<typeof mpesaFileSchema>;
