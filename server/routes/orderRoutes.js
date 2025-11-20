import express from "express";


import {
  createOrder,
  // verifyPayment,
  getAllOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/all",  getAllOrders);
router.delete("/:id", deleteOrder); // Fetch all orders (Admin)
router.get("/:id",  getOrderById); // Fetch single order details

export default router;
