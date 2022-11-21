import { Router } from "express";
import { profile } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", [verifyToken], profile);

export default router;
