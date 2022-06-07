import { Router } from "express";
import {
  index,
  store,
  show,
  destroy,
} from "../controllers/purchase.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", [verifyToken], index);
router.get("/show/:id", [verifyToken], show);
router.post("/store", [verifyToken], store);
router.delete("/destroy/:id", [verifyToken], destroy);

export default router;
