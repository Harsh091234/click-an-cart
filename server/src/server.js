import express from 'express';
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser"


dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

//routes
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  connectDB();
});