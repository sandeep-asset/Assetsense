import express from "express";
import Office from "../models/Office.js";
import { protect, admin } from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import {
  createOffice,
  deleteOfficeById,
  getAllOffice,
  getOfficeById,
  getRelatedOffices,
  searchOffices,
  updateOffice,
} from "../controllers/officeController.js";

dotenv.config();

const router = express.Router();

// Configure Cloudinary (optional - will work without it)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.get("/", getAllOffice);
router.get("/search", searchOffices);
router.get("/:id", getOfficeById);
router.get("/office/:id", getOfficeById);
router.post("/", protect, admin, upload.array("images", 10), createOffice);
router.put("/:id", protect, admin, upload.array("images", 10), updateOffice);
router.delete("/:id", protect, admin, deleteOfficeById);
router.get("/:id/related", getRelatedOffices);

export default router;
