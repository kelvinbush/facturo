import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "./utils/logger.js";
import { config } from "dotenv";
import router from "./routes/index.js";
import { cors } from "hono/cors";

config();

const PORT = process.env.PORT || 8081;

const app = new Hono();

// Apply CORS middleware
app.use("*", cors());

// Root endpoint
app.get("/", (c) => {
  return c.json({ message: "Facturo API is running" });
});

// Mount all routes
app.route("/", router);

// Start the server
serve(
  {
    fetch: app.fetch,
    port: +PORT,
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
    logger.info(`Chat endpoint available at http://localhost:${info.port}/api/chat`);
    logger.info(`Streaming chat endpoint available at http://localhost:${info.port}/api/chat/stream`);
  },
);
