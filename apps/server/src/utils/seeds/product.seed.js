// jeans, tshirts, shoes,  glasses, suits, jackets

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";

dotenv.config();

const demoProducts = [
  {
    name: "Slim Fit Blue Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop",
    description: "Comfortable slim fit denim jeans.",
    price: "2199",
    stock: "14",
    category: "jeans",
    isFeatured: true,
  },
  {
    name: "Black Ripped Jeans",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=800&fit=crop",
    description: "Stylish ripped black jeans.",
    price: "2499",
    stock: "9",
    category: "jeans",
    isFeatured: false,
  },
  {
    name: "Classic White Tshirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    description: "Soft cotton white tshirt.",
    price: "799",
    stock: "28",
    category: "tshirts",
    isFeatured: true,
  },
  {
    name: "Oversized Graphic Tshirt",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=800&fit=crop",
    description: "Trendy oversized printed tshirt.",
    price: "1199",
    stock: "20",
    category: "tshirts",
    isFeatured: false,
  },
  {
    name: "Running Sports Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    description: "Lightweight running shoes.",
    price: "3499",
    stock: "16",
    category: "shoes",
    isFeatured: true,
  },
  {
    name: "Casual White Sneakers",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
    description: "Everyday casual sneakers.",
    price: "2999",
    stock: "12",
    category: "shoes",
    isFeatured: true,
  },
  {
    name: "Round Frame Glasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop",
    description: "Minimal round frame glasses.",
    price: "1599",
    stock: "11",
    category: "glasses",
    isFeatured: false,
  },
  {
    name: "Premium Black Sunglasses",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&h=800&fit=crop",
    description: "UV protected sunglasses.",
    price: "1899",
    stock: "15",
    category: "glasses",
    isFeatured: true,
  },
  {
    name: "Formal Navy Suit",
    image:
      "https://images.unsplash.com/photo-1593621224867-e17cbc70dc2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF2eSUyMHN1aXR8ZW58MHwyfDB8fHww",
    description: "Elegant formal suit for events.",
    price: "7999",
    stock: "6",
    category: "suits",
    isFeatured: true,
  },
  {
    name: "Wedding Grey Suit",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=800&fit=crop",
    description: "Luxury grey wedding suit.",
    price: "9499",
    stock: "4",
    category: "suits",
    isFeatured: false,
  },
  {
    name: "Denim Jacket Blue",
    image:
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&h=800&fit=crop",
    description: "Classic blue denim jacket.",
    price: "3299",
    stock: "13",
    category: "jackets",
    isFeatured: true,
  },
  {
    name: "Leather Biker Jacket",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=800&fit=crop",
    description: "Premium leather biker jacket.",
    price: "5999",
    stock: "7",
    category: "jackets",
    isFeatured: true,
  },
  {
    name: "Relaxed Fit Jeans",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop",
    description: "Relaxed fit comfortable jeans.",
    price: "2299",
    stock: "18",
    category: "jeans",
    isFeatured: false,
  },
  {
    name: "Minimal Black Tshirt",
    image:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&h=800&fit=crop",
    description: "Premium black cotton tshirt.",
    price: "899",
    stock: "25",
    category: "tshirts",
    isFeatured: false,
  },
  {
    name: "High Top Sneakers",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
    description: "Stylish high top sneakers.",
    price: "3799",
    stock: "10",
    category: "shoes",
    isFeatured: true,
  },
  {
    name: "Transparent Frame Glasses",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop",
    description: "Modern transparent frame glasses.",
    price: "1699",
    stock: "9",
    category: "glasses",
    isFeatured: false,
  },
  {
    name: "Classic Black Suit",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop",
    description: "Timeless black formal suit.",
    price: "8599",
    stock: "5",
    category: "suits",
    isFeatured: true,
  },
  {
    name: "Winter Puffer Jacket",
    image:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&h=800&fit=crop",
    description: "Warm winter puffer jacket.",
    price: "4499",
    stock: "8",
    category: "jackets",
    isFeatured: false,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const user = await User.findOne();

    if (!user) {
      console.log("No user found in database");
      process.exit(1);
    }

    

    const productsWithAuthor = demoProducts.map((product) => ({
      ...product,
      author: user._id,
    }));

    await Product.insertMany(productsWithAuthor);

    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.log("Seed error:", error);
    process.exit(1);
  }
};

seedProducts();