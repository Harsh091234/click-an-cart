import express from 'express';
import dotenv from "dotenv"
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'path';

//routes import
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupons.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"


dotenv.config();

const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));;
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true,                // allow cookies/auth headers if needed
}))



//routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/analytics', analyticsRoutes)

if(process.env.NODE_ENV === "production"){
 
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  connectDB();
});