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

router.get("/all", getAllOrders);
router.delete("/:id", deleteOrder); // Fetch all orders (Admin)
router.get("/:id", getOrderById);
router.get("/status/:cfOrderId", getPaymentStatus); // Fetch single order details

export default router;
