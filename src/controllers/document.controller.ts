import type { Context } from "hono";
import { getDocumentContent } from "../services/document.service.js";
import { logger } from "../utils/logger.js";

export const documentHandler = async (c: Context, mpesaFile: File) => {
  try {
    const result = await getDocumentContent(mpesaFile);

    return c.json({
      success: true,
      metadata: result.metadata,
    });
  } catch (error) {
    logger.error("Error processing document upload:", error);
    return c.json(
      {
        success: false,
        error: "Failed to process document",
        details: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
};
