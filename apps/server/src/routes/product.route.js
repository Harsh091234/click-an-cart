import express from "express";
import {
  getAllProducts,
  getfeaturedProducts,
  deleteProduct,
  getRecommendedProducts,
  createProduct,
  getProductsByCategory,
  toggleFeaturedProduct,
  showSellerProducts
  
  
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute, sellerRoute,  } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getfeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory)
router.post("/", protectRoute, adminRoute, createProduct);
router.post("/seller", protectRoute, sellerRoute, createProduct);
router.get("/seller", protectRoute, sellerRoute, showSellerProducts);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;
