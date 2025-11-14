import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import officeRoutes from "./routes/officeslug.js";
import orderRoutes from "./routes/orderRoutes.js";
import { verifyPaymentWebhook } from "./controllers/orderController.js";

dotenv.config();

const app = express();

app.use(cors());
app.post(
  "/api/orders/webhook",
  express.raw({ type: "application/json" }),
  verifyPaymentWebhook // 👈 directly attach your controller
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/orders", orderRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Office Listing API is running!" });
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
