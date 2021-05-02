import express from "express";
import {
  productsList,
  AddNewProduct,
  viewProduct,
} from "../controllers/productController";
const router = express.Router();

router.get("/", productsList);
router.get("/:id", viewProduct);
router.post("/", AddNewProduct);

export default router;
