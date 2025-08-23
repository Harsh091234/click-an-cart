import express from "express";
import {
  getAllProducts,
  getfeaturedProducts,
  deleteProduct,
  getRecommendedProducts,
  createProduct
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute,  } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getfeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
