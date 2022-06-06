import { Router } from "express";
import purchase from "./purchase.routes.js";
import sales from "./sales.routes.js";
import auth from "./auth.routes.js";
import wallet from "./wallet.routes.js";
import commerce from "./commerce.routes.js";
import products from "./products.routes.js";
import profile from "./user.routes.js";

const router = Router();

router.use("/auth", auth);
router.use("/purchase", purchase);
router.use("/sales", sales);
router.use("/wallet", wallet);
router.use("/commerce", commerce);
router.use("/products", products);
router.use("/profile", profile);

export default router;
