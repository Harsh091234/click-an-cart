import Product from "../models/product.model.js";
import {redis} from "../utils/redis.js"
import cloudinary from "../utils/cloudinary.js"



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

export const getfeaturedProducts = async(req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if(featuredProducts){
      return res.json(JSON.parse(featuredProducts));
    }
  
    featuredProducts = await Product.find({isFeatured: true}).lean();
    if(!featuredProducts){
      return res.status(404).json({message: "No featured products found"});
    }
  
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  
    res.json(featuredProducts);
  } catch (error) {
     console.log("Error in featuredProducts controller:", error);
  res.status(500).json({ message: "Error in featuredProducts controller:" });
  }
}

export const createProduct = async(req, res) => {
  try {
    const {name, image, description, price, category, stock} = req.body;

    let cloudinaryResponse = null;
    if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"});
    }
    const product = await Product.create({
      name, 
      description,
      price,
      stock,
      image: cloudinaryResponse?.secure_url || "",
      category,
      author: req.user._id,
    })
    console.log("product: ", product);
    res.status(201).json(product);

  } catch (error) {
      console.error("Error in createProduct controller:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
}


export const deleteProduct = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    if(product.image){
      const publicId = product.image.split("/").pop().split(".")[0]; //makes https://res.cloudinary.com/demo/image/upload/v1692795478/products/mybag123.jpg => mybag123

      try {
        await cloudinary.uploader.destroy("/").pop().split(".")[0];
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("error deleting image from cloudinary", error)
      }

      await Product.findByIdAndDelete(req.params.id)

      res.json({message: "Product deleted successfully"});
    }

  } catch (error) {
       console.error("Error in deleteProduct controller:", error);
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
  })
}}

export const getRecommendedProducts = async(req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: {size: 3}
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1
        }
      }
    ])

    res.json(products);
  } catch (error) {
      console.error("Error in getRecommendedProducts:", error.message);
    res.status(500).json({ message: "Failed to fetch recommended products" });
  }
}

export const showSellerProducts = async (req, res) => {
  try {
  
  
 
    const products = await Product.find({ author: req.user._id }).sort({ createdAt: -1 });
    if(!products){
      return res.status(404).json({message: "No products found for this seller"});
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({ message: "Server error. Could not fetch products." });
  }
};
export const  getProductsByCategory = async(req, res) => {
  
  try {
    const {category} = req.params;
    console.log("category:", category)
    const products = await Product.find({category});
    res.json({products});
  } catch (error) {
    console.error("Error in getProductsByCategory:", error.message);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
}

export const toggleFeaturedProduct = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product){
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    }
    else{
      res.status(404).json({message: "Product not found"});
    }
  } catch (error) {
    console.error("Error in toggleFeaturedProduct:", error.message);
    res.status(500).json({ message: "Failed to toggle featured product" });
  }
}

const updateFeaturedProductsCache = async() => {
  try {
    const featuredProducts = await Product.find({isFeatured: true}).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
      console.error("Error in updateFeaturedProductsCache:", error.message);
  }
}
