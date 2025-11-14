import express from "express";
import jwt from "jsonwebtoken";

import {
  deleteUser,
  getallUser,
  loginUser,
  registerUser,
  updateUser,
  verifyToken,
} from "../controllers/authController.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyToken);
router.get("/users", protect, admin, getallUser);
router.put("/users/:id", protect, admin, updateUser);
router.delete("/users/:id", protect, admin, deleteUser);
export default router;
