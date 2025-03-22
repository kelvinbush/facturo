import type { Context } from "hono";
import {
  getChatResponse,
  streamChatResponse,
} from "../services/chat.service.js";
import { logger } from "../utils/logger.js";
import { streamSSE } from "hono/streaming";

export interface ChatRequestBody {
  text: string;
}

export const handleChatRequest = async (c: Context) => {
  try {
    const body = await c.req.json<ChatRequestBody>();

    if (!body.text) {
      return c.json(
        {
          error: "Invalid request: text field is required and must be a string",
        },
        400,
      );
    }

    const response = await getChatResponse(body.text);
    return c.json(response);
  } catch (error) {
    logger.error("Error processing chat request:", error);
    return c.json({ error: "Failed to process chat request" }, 500);
  }
};

// Handle streaming chat requests
export const handleStreamChatRequest = async (c: Context) => {
  try {
    const body = await c.req.json<ChatRequestBody>();

    if (!body.text) {
      return c.json(
        {
          error: "Invalid request: text field is required and must be a string",
        },
        400,
      );
    }

    // Use Server-Sent Events (SSE) for streaming
    return streamSSE(c, async (stream) => {
      try {
        const response = await streamChatResponse(body.text);

        // Stream each chunk to the client
        for await (const chunk of response) {
          const content = chunk.data.choices[0].delta.content;
          // Log specific parts of the chunk to better understand its structure
          console.log("Streaming chunk content:", content);
          if (content) {
            await stream.writeSSE({
              data: JSON.stringify({ content }),
              event: "message",
            });
          }
        }
      } catch (error) {
        logger.error("Error in stream:", error);
        await stream.writeSSE({
          data: JSON.stringify({ error: "Stream error occurred" }),
          event: "error",
        });
      } finally {
        // Close the stream
        await stream.close();
      }
    });
  } catch (error) {
    logger.error("Error processing streaming chat request:", error);
    return c.json({ error: "Failed to process streaming chat request" }, 500);
  }
};
