import express from "express";
import Office from "../models/Office.js";
import { protect, admin } from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import slugify from "slugify"; // ✅ npm install slugify

dotenv.config();

// Configure Cloudinary (optional - will work without it)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// for uploading photos
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// create Offices

export const createOffice = async (req, res) => {
  try {
    let officeData;

    if (req.body.data) {
      officeData = JSON.parse(req.body.data);
    } else {
      officeData = req.body;
    }

    // Basic validation
    if (
      !officeData.name ||
      !officeData.location?.city ||
      !officeData.location?.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields: name, city, address",
      });
    }

    const imageUrls = [];

    // Handle image uploads if Cloudinary is configured
    if (
      req.files &&
      req.files.length > 0 &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });
          imageUrls.push(result.secure_url);
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
        }
      }
    } else if (req.files && req.files.length > 0) {
      // If no Cloudinary, we'll just use placeholder or local storage
      imageUrls.push(
        ...Array(req.files.length).fill("/placeholder-office.jpg")
      );
    }

    // const office = await Office.create({
    //   ...officeData,
    //   images: imageUrls.length > 0 ? imageUrls : officeData.images || [],
    // });

    // new code for office creating slug based
    // ✅ Generate a unique slug and branchCode before creating
    const baseSlug = slugify(`${officeData.name}-${officeData.location.city}`, {
      lower: true,
    });
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await Office.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const branchCode = `${officeData.location.city
      .slice(0, 3)
      .toUpperCase()}-${Date.now().toString().slice(-4)}`;

    // ✅ Now create office with slug + branchCode
    const office = await Office.create({
      ...officeData,
      slug: uniqueSlug,
      branchCode,
      images: imageUrls.length > 0 ? imageUrls : officeData.images || [],
    });
    // new code addedd end here

    res.status(201).json({
      success: true,
      data: office,
    });
  } catch (error) {
    console.error("Create office error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//Get all Offices
export const getAllOffice = async (req, res) => {
  try {
    const { type, city, page = 1, limit = 10 } = req.query;
    let query = {};
    if (type && type !== "all") query.type = type;

    if (city) query["location.city"] = new RegExp(city, "i");

    const offices = await Office.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Office.countDocuments(query);

    res.json({
      success: true,
      data: {
        offices,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total,
      },
    });
  } catch (error) {
    console.error("Get offices error:", error);
    res.status(500).json({
      success: false,
      message: "Error in Getting Offices",
    });
  }
};

//Get Single Office by ID

export const getOfficeById = async (req, res) => {
  try {
    // const office = await Office.findById(req.params.id);
    const idOrSlug = req.params.slug;
    const office =
      (await Office.findById(idOrSlug)) ||
      (await Office.findOne({ slug: idOrSlug }));

    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }

    res.json({
      success: true,
      data: office,
    });
  } catch (error) {
    console.error("Get office error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error fetching office",
    });
  }
};

export const updateOffice = async (req, res) => {
  try {
    let officeData = req.body.data ? JSON.parse(req.body.data) : req.body;

    // Find the existing office
    const office = await Office.findById(req.params.id);
    if (!office) {
      return res
        .status(404)
        .json({ success: false, message: "Office not found" });
    }

    let imageUrls = [];

    // Keep old images (if any)
    if (officeData.existingImages && officeData.existingImages.length > 0) {
      imageUrls = [...officeData.existingImages];
    }

    // Upload new images to Cloudinary (if any)
    if (
      req.files &&
      req.files.length > 0 &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });
          imageUrls.push(result.secure_url);
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
        }
      }
    }

    // Update office
    const updatedOffice = await Office.findByIdAndUpdate(
      req.params.id,
      {
        ...officeData,
        images: imageUrls, // Always send full array of final image URLs
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedOffice,
    });
  } catch (error) {
    console.error("Update office error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }

    await Office.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Office deleted successfully",
    });
  } catch (error) {
    console.error("Delete office error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting office",
    });
  }
};

// ✅ Fetch related offices
export const getRelatedOffices = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the main office
    const mainOffice = await Office.findById(id);
    if (!mainOffice) {
      return res
        .status(404)
        .json({ success: false, message: "Office not found" });
    }

    // Match same city and type, exclude current one
    // const relatedOffices = await Office.find({
    //   _id: { $ne: id },
    //   "location.city": mainOffice.location.city,
    //   type: mainOffice.type,
    // }).limit(4);
    const relatedOffices = await Office.find({
      _id: { $ne: id },
      "location.city": mainOffice.location.city,
      type: mainOffice.type,
      branchCode: { $ne: mainOffice.branchCode },
    }).limit(4);

    res.status(200).json({
      success: true,
      data: relatedOffices,
    });
  } catch (error) {
    console.error("Error fetching related offices:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Office By Search

export const searchOffices = async (req, res) => {
  try {
    const { query } = req.query; // search text from frontend

    if (!query) {
      const offices = await Office.find({});
      return res.json({ success: true, data: offices });
    }

    const searchRegex = new RegExp(query, "i"); // case-insensitive match

    const offices = await Office.find({
      // $or: [
      //   { name: searchRegex },
      //   { type: searchRegex },
      //   { description: searchRegex },
      //   { "location.city": searchRegex },
      //   { "location.address": searchRegex },
      //   { features: { $in: [searchRegex] } },
      // ],
      $or: [
        { name: searchRegex },
        { type: searchRegex },
        { description: searchRegex },
        { "location.city": searchRegex },
        { "location.address": searchRegex },
        { slug: searchRegex },
        { branchCode: searchRegex },
        { features: { $in: [searchRegex] } },
      ],
    });

    res.json({
      success: true,
      count: offices.length,
      data: offices,
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
