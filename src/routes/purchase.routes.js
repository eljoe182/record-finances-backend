import { Router } from "express";
import { index, store } from "../controllers/purchase.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", [verifyToken], index);
router.post("/store", [verifyToken], store);

export default router;
