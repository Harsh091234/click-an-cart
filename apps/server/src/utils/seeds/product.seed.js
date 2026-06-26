import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../../models/user.model.js";
import Product from "../../models/product.model.js";

dotenv.config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip.",
    price: "129999",
    stock: "25",
    category: "Mobiles",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android flagship with S Pen.",
    price: "119999",
    stock: "18",
    category: "Mobiles",
  },
  {
    name: "MacBook Air M3",
    description: "Lightweight laptop powered by Apple M3.",
    price: "149999",
    stock: "10",
    category: "Laptops",
  },
  {
    name: "Dell XPS 15",
    description: "High-performance Windows laptop.",
    price: "165000",
    stock: "12",
    category: "Laptops",
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling headphones.",
    price: "29999",
    stock: "40",
    category: "Audio",
  },
  {
    name: "Apple Watch Series 10",
    description: "Advanced smartwatch with health tracking.",
    price: "45999",
    stock: "22",
    category: "Wearables",
  },
  {
    name: "Nike Air Max",
    description: "Comfortable everyday running shoes.",
    price: "8999",
    stock: "60",
    category: "Footwear",
  },
  {
    name: "Logitech MX Master 3S",
    description: "Premium wireless productivity mouse.",
    price: "9999",
    stock: "45",
    category: "Accessories",
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches.",
    price: "5999",
    stock: "35",
    category: "Accessories",
  },
  {
    name: "Canon EOS R10",
    description: "Mirrorless camera for creators.",
    price: "79999",
    stock: "8",
    category: "Camera",
  },
];

const imagePool = [
  "https://picsum.photos/600/600?random=1",
  "https://picsum.photos/600/600?random=2",
  "https://picsum.photos/600/600?random=3",
  "https://picsum.photos/600/600?random=4",
  "https://picsum.photos/600/600?random=5",
  "https://picsum.photos/600/600?random=6",
  "https://picsum.photos/600/600?random=7",
  "https://picsum.photos/600/600?random=8",
  "https://picsum.photos/600/600?random=9",
  "https://picsum.photos/600/600?random=10",
  "https://picsum.photos/600/600?random=11",
  "https://picsum.photos/600/600?random=12",
  "https://picsum.photos/600/600?random=13",
  "https://picsum.photos/600/600?random=14",
  "https://picsum.photos/600/600?random=15",
];

const getRandomImages = () => {
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 images

  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
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
      images: getRandomImages(),
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
