import { logger } from "../utils/logger.js";

export const getDocumentContent = async (
  file: File,
): Promise<{
  content: string;
  metadata: {
    fileName: string;
    fileType: string;
    fileSize: number;
  };
}> => {
  try {
    logger.info(`Processing document: ${file.name}`);

    const content = await file.text();

    return {
      content: content.substring(0, 1000),
      metadata: {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      },
    };
  } catch (error) {
    logger.error("Error processing document content:", error);
    throw new Error(
      `Failed to process document content: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
