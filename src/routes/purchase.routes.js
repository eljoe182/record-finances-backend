import { Router } from "express";
import { index, store, show } from "../controllers/purchase.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", [verifyToken], index);
router.post("/store", [verifyToken], store);
router.get("/show/:id", [verifyToken], show);

export default router;
