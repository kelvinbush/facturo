import { Hono } from "hono";
import chatRouter from "./chat.routes.js";
import documentRoute from "./document.route.js";

const router = new Hono();

// Mount the routers
router.route("/api", chatRouter);

router.route("/api", documentRoute);

export default router;
