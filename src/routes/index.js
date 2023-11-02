"use strict";

import express from "express";
import authRouter from "./access";
import { apiKey, permission } from "../middlewares/checkAuth";
import { Permissions } from "../utils/constantType";

const router = express.Router();

// check ApiKey
router.use(apiKey);
// check Permission
router.use(permission(Permissions.ALL));

router.use(authRouter);

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
