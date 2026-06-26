import Product from "../models/product.model.js";
import { redis } from "../utils/redis.js";
import cloudinary, { uploadOnCloudinary } from "../utils/cloudinary.js";
import { success } from "zod";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProducts controller:", error.message);
    res.status(500).json({
      message: "Error in getAllProducts controller",
      error: error.message,
    });
  }
};

export const getfeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("click-an-cart:featured_products");
    if (featuredProducts) {
      return res.json(featuredProducts);
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(200).json([]);
    }

    await redis.set(
      "click-an-cart:featured_products",
      JSON.stringify(featuredProducts),
      {
        ex: 150,
      },
    );

    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in featuredProducts controller:", error);
    res.status(500).json({ message: "Error in featuredProducts controller:" });
  }
};

export const createProduct = async (req, res) => {
  
  try {
    const { name, description, price, category, stock } = req.body;

    const images = req.files;

    if (images.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Atleast one image is required" });

    let imageUrls = await Promise.all(
      images.map(async (image) => {
        const cloudResponse = await uploadOnCloudinary(image.path);
        return cloudResponse.secure_url;
      }),
    );

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images: imageUrls,
      category,
      author: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProduct controller:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete images from Cloudinary
    if (product.images?.length) {
      for (const image of product.images) {
        const publicId = image.split("/").pop().split(".")[0];

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Error deleting image:", err);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteProduct:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error("Error in getRecommendedProducts:", error.message);
    res.status(500).json({ message: "Failed to fetch recommended products" });
  }
};

export const showSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    if (!products) {
      return res
        .status(200)
        .json({ message: "No products found for this seller" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not fetch products." });
  }
};

export const editProduct = async (req, res) => {
  console.log("editProduct called", new Date().toISOString());
  try {
    const { name, description, price, category, stock } = req.body;
    const removedImages = JSON.parse(req.body.removedImages || "[]");
    console.log("remove images", removedImages);
    const { id } = req.params;
    const images = req.files ?? [];
    console.log("images", images, req.files.length);

    const hasUpdates =
      name !== undefined ||
      description !== undefined ||
      price !== undefined ||
      category !== undefined ||
      stock !== undefined ||
      images.length > 0 ||
      removedImages.length > 0;

    if (!hasUpdates) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update.",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (removedImages.length) {
      product.images = product.images.filter(
        (img) => !removedImages.includes(img),
      );
    }

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const uploaded = await uploadOnCloudinary(image.path);
        return uploaded.secure_url;
      }),
    );
   

    if (name !== undefined) {
      product.name = name;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    if (uploadedImages.length) {
      product.images.push(...uploadedImages);
    }

    await product.save();
    console.log("product", product);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in editProduct controller:", error);
    res.status(500).json({
      message: "Error editing product",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    if (!req.params.id) return;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching  product:", error);
    res.status(500).json({ message: "Server error. Could not fetch product." });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    console.error("Error in getProductsByCategory:", error.message);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in toggleFeaturedProduct:", error.message);
    res.status(500).json({ message: "Failed to toggle featured product" });
  }
};

const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set(
      "click-an-card:featured_products",
      JSON.stringify(featuredProducts),
      {
        ex: 150,
      },
    );
  } catch (error) {
    console.error("Error in updateFeaturedProductsCache:", error.message);
  }
};
