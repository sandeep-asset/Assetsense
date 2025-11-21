import express from "express";

import {
  createOrder,
  // verifyPayment,
  getAllOrders,
  getOrderById,
  deleteOrder,
  getPaymentStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/payment-status", getPaymentStatus);

router.get("/all", protect, admin, getAllOrders);
router.delete("/:id", protect, admin, deleteOrder); // Fetch all orders (Admin)
router.get("/:id", protect, admin, getOrderById);
// router.get("/payment-status", getPaymentStatus); // Fetch single order details

export default router;
