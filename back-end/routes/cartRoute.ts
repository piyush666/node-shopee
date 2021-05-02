import express from "express";
import { cartList, AddItemToCart } from "../controllers/cartController";

const router = express.Router();

router.get("/", cartList);
router.post("/", AddItemToCart);

export default router;
