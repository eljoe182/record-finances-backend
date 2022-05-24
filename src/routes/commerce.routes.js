import { Router } from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "../controllers/commerce.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", [verifyToken], index);
router.post("/store", [verifyToken], store);
router.get("/show/:id", [verifyToken], show);
router.put("/update/:id", [verifyToken], update);
router.delete("/delete/:id", [verifyToken], destroy);

export default router;
