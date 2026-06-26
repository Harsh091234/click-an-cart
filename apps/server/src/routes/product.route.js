import express from "express";
import {
  getAllProducts,
  getfeaturedProducts,
  deleteProduct,
  getRecommendedProducts,
  createProduct,
  getProductsByCategory,
  toggleFeaturedProduct,
  showSellerProducts,
  getProductById,
  editProduct,
} from "../controllers/product.controller.js";
import {
  adminRoute,
  protectRoute,
  sellerRoute,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/mutler.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { CreateProductSchema, EditProductSchema } from "@repo/shared";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getfeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", protectRoute, upload.array("images", 5), validate(CreateProductSchema), adminRoute, createProduct);
router.post(
  "/seller",
  protectRoute,
  upload.array("images", 5),
  validate(CreateProductSchema),
  createProduct,
);
router.get("/seller", protectRoute, sellerRoute, showSellerProducts);
router.get("/:id", protectRoute, getProductById);
router.patch(
  "/edit/:id",
  protectRoute,
  upload.array("images", 5),
  // validate(EditProductSchema),
  editProduct,
);  
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
