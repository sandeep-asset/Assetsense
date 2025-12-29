import express from "express";
import { protect, admin } from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import {
  createOffice,
  deleteOfficeById,
  getAllCities,
  getAllOffice,
  getOfficeById,
  getOfficeFilters,
  getRelatedOffices,
  searchOffices,
  searchOfficesfilter,
  updateOffice,
} from "../controllers/officecontrollerSlug.js";
import { activeOfficeOnly } from "../middleware/activeOfficeOnly.js";

dotenv.config();

const router = express.Router();

// Cloudinary config (optional)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Routes
router.get("/", activeOfficeOnly, getAllOffice);
router.get("/search", activeOfficeOnly, searchOffices);
router.get("/cities", activeOfficeOnly, getAllCities);
router.get("/slug/:slug", activeOfficeOnly, getOfficeById);
router.get("/:slug/related", activeOfficeOnly, getRelatedOffices);
router.post("/", protect, admin, upload.array("images", 10), createOffice);
router.put("/:id", protect, admin, upload.array("images", 10), updateOffice);
router.delete("/:id", protect, admin, deleteOfficeById);

// Get dynamic filters city, price, office type
router.get("/filters", activeOfficeOnly, getOfficeFilters);
// get office for gallery

// Search offices on the basis of filter
router.get("/searchfilter", activeOfficeOnly, searchOfficesfilter);

export default router;
