import express from "express";
import { searchProducts, deleteProduct } from "../Controllers/SearchProductControllers.js";

const router = express.Router();

router.get("/", searchProducts);

router.delete("/:id", deleteProduct);

export default router;
