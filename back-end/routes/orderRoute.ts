import express from "express";
import { OrderList, addOrder, ViewOrder } from "../controllers/orderController";

const router = express.Router();

router.get("/", OrderList);
router.post("/create", addOrder);
router.get("/:orderId", ViewOrder);
export default router;
