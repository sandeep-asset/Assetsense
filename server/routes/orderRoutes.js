import express from "express";

import { admin, protect } from "../middleware/auth.js";
import {
  createOrder,
  // verifyPayment,
  getAllOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/all", protect, admin, getAllOrders);
router.delete("/:id", protect, admin, deleteOrder); // Fetch all orders (Admin)
router.get("/:id", protect, admin, getOrderById); // Fetch single order details

export default router;
