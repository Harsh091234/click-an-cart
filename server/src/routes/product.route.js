import express from "express";
import {
  getAllProducts,
  getfeaturedProducts,
  deleteProduct,
  getRecommendedProducts,
  createProduct,
  getProductsByCategory,
  toggleFeaturedProduct,
  
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute,  } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getfeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory)
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;
