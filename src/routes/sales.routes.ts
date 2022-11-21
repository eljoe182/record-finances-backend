import { Router } from "express";
import { index } from "../controllers/sales.controller";

const router = Router();

router.get("/", index);

export default router;
