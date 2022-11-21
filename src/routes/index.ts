import { Router } from "express";
import purchase from "./purchase.routes";
import sales from "./sales.routes";
import auth from "./auth.routes";
import wallet from "./wallet.routes";
import commerce from "./commerce.routes";
import products from "./products.routes";
import profile from "./user.routes";

const router = Router();

router.use("/auth", auth);
router.use("/purchase", purchase);
router.use("/sales", sales);
router.use("/wallet", wallet);
router.use("/commerce", commerce);
router.use("/products", products);
router.use("/profile", profile);

export default router;
