import express from "express";
import { protect, admin } from "../middleware/auth.js";
import dotenv from "dotenv";
import {
  getAllOffice,
  toggleOfficeStatus,
} from "../controllers/adminController.js";

dotenv.config();

const router = express.Router();

// Routes
router.get("/", getAllOffice);
router.patch("/:id/status", protect, admin, toggleOfficeStatus);

export default router;
