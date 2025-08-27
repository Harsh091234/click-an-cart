import express from 'express';
import dotenv from "dotenv"

import connectDB from "./db/db.js";
import cookieParser from "cookie-parser"

//routes import
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupons.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

//routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/analytics', analyticsRoutes)
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  connectDB();
});