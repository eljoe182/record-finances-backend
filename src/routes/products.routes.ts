import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  destroy,
  index,
  show,
  store,
  update,
  findByDescription,
} from "../controllers/products.controller";

const router = Router();

router.get("/", [verifyToken], index);
router.post("/store", [verifyToken], store);
router.get("/show/:id", [verifyToken], show);
router.put("/update/:id", [verifyToken], update);
router.delete("/delete/:id", [verifyToken], destroy);
router.get("/find/:query", [verifyToken], findByDescription);

export default router;
