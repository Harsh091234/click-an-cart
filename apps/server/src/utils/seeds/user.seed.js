import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../../models/user.model.js"; // Update the path accordingly

dotenv.config();

const sampleNames = [
  "Harsh Sharma",
  "Aman Verma",
  "Priya Singh",
  "Rahul Kumar",
  "Neha Gupta",
  "Rohit Yadav",
  "Anjali Sharma",
  "Vikas Patel",
  "Sneha Mishra",
  "Arjun Mehta",
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Optional: Delete existing users
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        name: sampleNames[i],
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
        role: i === 0 ? "admin" : "buyer",
        authProvider: "local",
        isVerified: true,
        hasPassword: true,
        phone: `98765432${String(i).padStart(2, "0")}`,
        location: "India",
        avatar: `https://i.pravatar.cc/300?img=${i + 1}`,
        coverImage: `https://picsum.photos/1200/400?random=${i + 1}`,
        languages: ["English", "Hindi"],
      });
    }

    await User.insertMany(users);

    console.log("✅ 10 sample users seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
