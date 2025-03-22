import { Hono } from "hono";
import { documentHandler } from "../controllers/document.controller.js";
import { zValidator } from "@hono/zod-validator";
import { mpesaFileSchema } from "../validators/document.validator.js";

const documentRoute = new Hono();

documentRoute.post(
  "/upload",
  zValidator("form", mpesaFileSchema),
  async (c) => {
    const mpesaFile = c.req.valid("form");
    return await documentHandler(c, mpesaFile.mpesa);
  },
);
export default documentRoute;
