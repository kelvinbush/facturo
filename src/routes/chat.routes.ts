import { Hono } from "hono";
import { handleChatRequest, handleStreamChatRequest } from "../controllers/chat.controller.js";

const chatRouter = new Hono();

// POST endpoint for regular chat requests
chatRouter.post("/chat", handleChatRequest);

// POST endpoint for streaming chat responses
chatRouter.post("/chat/stream", handleStreamChatRequest);

export default chatRouter;
