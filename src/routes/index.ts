import { Hono } from "hono";
import chatRouter from "./chat.routes.js";

const router = new Hono();

// Mount the chat router
router.route("/api", chatRouter);

export default router;
