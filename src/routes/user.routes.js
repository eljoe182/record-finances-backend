import { Router } from "express";
import { profile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", [verifyToken], profile);

export default router;
