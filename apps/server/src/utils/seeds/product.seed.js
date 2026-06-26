import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../../models/user.model.js";
import Product from "../../models/product.model.js";

dotenv.config();
const sampleProducts = [
  {
    name: "Levi's 511 Slim Jeans",
    description: "Comfortable slim-fit denim jeans.",
    price: "3499",
    stock: "30",
    category: "jeans",
  },
  {
    name: "Nike Sports T-Shirt",
    description: "Breathable cotton sports t-shirt.",
    price: "1499",
    stock: "50",
    category: "t-shirts",
  },
  {
    name: "Adidas Ultraboost",
    description: "Premium running shoes with responsive cushioning.",
    price: "9999",
    stock: "20",
    category: "shoes",
  },
  {
    name: "Ray-Ban Aviator",
    description: "Classic polarized aviator sunglasses.",
    price: "7999",
    stock: "15",
    category: "glasses",
  },
  {
    name: "Zara Denim Jacket",
    description: "Stylish blue denim jacket for casual wear.",
    price: "4999",
    stock: "18",
    category: "jackets",
  },
  {
    name: "Allen Solly Formal Suit",
    description: "Elegant slim-fit two-piece formal suit.",
    price: "12999",
    stock: "10",
    category: "suits",
  },
  {
    name: "Wildcraft Backpack",
    description: "Durable backpack with multiple compartments.",
    price: "2499",
    stock: "35",
    category: "bags",
  },
  {
    name: "Pepe Jeans Regular Fit",
    description: "Classic everyday blue jeans.",
    price: "2999",
    stock: "28",
    category: "jeans",
  },
  {
    name: "Puma Graphic T-Shirt",
    description: "Soft cotton graphic tee for everyday wear.",
    price: "1299",
    stock: "40",
    category: "t-shirts",
  },
  {
    name: "Fossil Leather Messenger Bag",
    description: "Premium leather office messenger bag.",
    price: "6999",
    stock: "12",
    category: "bags",
  },
];


const imagePool = {
  jeans: "https://source.unsplash.com/600x600/?jeans",
  "t-shirts": "https://source.unsplash.com/600x600/?tshirt",
  shoes: "https://source.unsplash.com/600x600/?shoes",
  glasses: "https://source.unsplash.com/600x600/?sunglasses",
  jackets: "https://source.unsplash.com/600x600/?jacket",
  suits: "https://source.unsplash.com/600x600/?suit",
  bags: "https://source.unsplash.com/600x600/?bag",
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});

    const users = await User.find();
    console.log("user", users);
    if (!users.length) {
      console.log("No users found. Seed users first.");
      process.exit(1);
    }

    const products = sampleProducts.map((product, index) => ({
      ...product,
      images: [imagePool[product.category]],
      isFeatured: index < 3,
      author: users[Math.floor(Math.random() * users.length)]._id,
    }));

    await Product.insertMany(products);

    console.log("✅ Products seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
