import { config } from "dotenv";
import { Mistral } from "@mistralai/mistralai";
import type { ChatResponse } from "../utils/types.js";

config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey });
export const getChatResponse = async (text: string): Promise<ChatResponse> => {
  try {
    // For non-streaming requests
    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: text }],
    });

    if (!response.choices || response.choices.length === 0) {
      return { text: null, error: "No response choices available" };
    }
    return { text: response.choices[0].message.content };
  } catch (error) {
    return { text: null, error: "Failed to get chat response" };
  }
};

// Stream version of the chat response
export const streamChatResponse = async (text: string) => {
  try {
    return await client.chat.stream({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: text }],
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating chat stream:", error);
    throw error;
  }
};
