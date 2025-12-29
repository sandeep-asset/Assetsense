import express from "express";
import Office from "../models/Office.js";
import { protect, admin } from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import slugify from "slugify";
import mongoose from "mongoose"; // Needed for ID validation

dotenv.config();

// Configure Cloudinary (optional - will work without it)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Create Office
export const createOffice = async (req, res) => {
  try {
    const officeData = req.body.data ? JSON.parse(req.body.data) : req.body;

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

    if (
      req.files &&
      req.files.length > 0 &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: "image",

                // 🔥 ADD THESE OPTIMIZATION SETTINGS 🔥
                folder: "property_images",

                transformation: [
                  { width: 1600, height: 1600, crop: "limit" },
                  { flags: "lossy" },
                  { quality: "auto:good" },
                ],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });

          imageUrls.push(result.secure_url);
        } catch (err) {
          console.error("Cloudinary upload error:", err);
        }
      }
    } else if (req.files && req.files.length > 0) {
      imageUrls.push(
        ...Array(req.files.length).fill("/placeholder-office.jpg")
      );
    }

    //  Generate unique slug
    const baseSlug = slugify(
      `${officeData.type}-${officeData.location.city}-${officeData.name}`,
      { lower: true, strict: true }
    );
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await Office.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    // Branch code
    const branchCode = `${officeData.location.city
      .slice(0, 3)
      .toUpperCase()}-${Date.now().toString().slice(-4)}`;
    // services array if added

    if (officeData.services && typeof officeData.services === "string") {
      try {
        officeData.services = JSON.parse(officeData.services);
      } catch (err) {
        console.error("Error parsing services JSON:", err);
        officeData.services = [];
      }
    }
    const services = Array.isArray(officeData.services)
      ? officeData.services.map((s) => ({
          name: s.name,
          price: s.price,
          description: s.description || "",
        }))
      : [];

    // upsell services array if added
    if (
      officeData.upsellservices &&
      typeof officeData.upsellservices === "string"
    ) {
      try {
        officeData.upsellservices = JSON.parse(officeData.upsellservices);
      } catch (err) {
        console.error("Error parsing Upsellservices JSON:", err);
        officeData.upsellservices = [];
      }
    }
    const upsellservices = Array.isArray(officeData.upsellservices)
      ? officeData.upsellservices.map((s) => ({
          name: s.name,
          regularprice: s.regularprice,
          assetsenseprice: s.assetsenseprice,
          description: s.description || "",
        }))
      : [];

    const office = await Office.create({
      ...officeData,
      slug: uniqueSlug,
      branchCode,
      services,
      upsellservices,

      images: imageUrls.length > 0 ? imageUrls : officeData.images || [],
    });

    res.status(201).json({ success: true, data: office });
  } catch (error) {
    console.error("Create office error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Get All Offices
export const getAllOffice = async (req, res) => {
  try {
    const { type, city, page = 1, limit = 10 } = req.query;
    let query = { isActive: true };

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
    res.status(500).json({ success: false, message: "Error fetching offices" });
  }
};

// Get Office by Slug (or ID fallback)
export const getOfficeById = async (req, res) => {
  try {
    const idOrSlug = req.params.id || req.params.slug;

    // Try finding by slug first, then by valid ObjectId
    const office =
      (await Office.findOne({ slug: idOrSlug, isActive: true })) ||
      (mongoose.Types.ObjectId.isValid(idOrSlug) &&
        (await Office.findById(idOrSlug)));

    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }

    res.json({ success: true, data: office });
  } catch (error) {
    console.error("Get office error:", error);
    res.status(500).json({ success: false, message: "Error fetching office" });
  }
};

//  Update Office
export const updateOffice = async (req, res) => {
  try {
    let officeData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const office = await Office.findById(req.params.id);
    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }

    let imageUrls = [...(officeData.existingImages || [])];

    // Upload new images if any
    if (
      req.files &&
      req.files.length > 0 &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      for (const file of req.files) {
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
      }
    }

    //  Handle updated services (if present)
    let updatedServices = office.services; // keep existing by default
    if (Array.isArray(officeData.services)) {
      updatedServices = officeData.services.map((s) => ({
        name: s.name,
        price: s.price,
        description: s.description || "",
      }));
    }

    // Handle updated Upsellservices (if present)
    let updatedUpsellservices = office.upsellservices; // keep existing by default
    if (Array.isArray(officeData.upsellservices)) {
      updatedUpsellservices = officeData.upsellservices.map((s) => ({
        name: s.name,
        regularprice: s.regularprice,
        assetsenseprice: s.assetsenseprice,
        description: s.description || "",
      }));
    }

    // Regenerate slug if name or city changed
    if (
      officeData.name !== office.name ||
      officeData.location?.city !== office.location.city
    ) {
      const newSlugBase = slugify(
        `${officeData.type || office.type}-${officeData.location.city}-${
          officeData.name
        }`,
        { lower: true, strict: true }
      );
      let uniqueSlug = newSlugBase;
      let counter = 1;
      while (
        await Office.findOne({ slug: uniqueSlug, _id: { $ne: office._id } })
      ) {
        uniqueSlug = `${newSlugBase}-${counter++}`;
      }
      officeData.slug = uniqueSlug;
    }

    const updatedOffice = await Office.findByIdAndUpdate(
      req.params.id,
      {
        ...officeData,
        updatedServices,
        updatedUpsellservices,
        images: imageUrls,
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updatedOffice });
  } catch (error) {
    console.error("Update office error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Office
export const deleteOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office)
      return res
        .status(404)
        .json({ success: false, message: "Office not found" });

    await Office.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Office deleted successfully" });
  } catch (error) {
    console.error("Delete office error:", error);
    res.status(500).json({ success: false, message: "Error deleting office" });
  }
};

//  Related Offices by Slug or ID
export const getRelatedOffices = async (req, res) => {
  try {
    const { slug } = req.params;

    //  1. Find main office by slug
    const mainOffice = await Office.findOne({ slug });

    if (!mainOffice) {
      return res
        .status(404)
        .json({ success: false, message: "Main office not found" });
    }

    //  2. Find related offices in same city and type
    const relatedOffices = await Office.find({
      _id: { $ne: mainOffice._id },
      "location.city": mainOffice.location.city,
      type: mainOffice.type,
      isActive: true,
    }).limit(4);

    res.status(200).json({ success: true, data: relatedOffices });
  } catch (error) {
    console.error("Error fetching related offices:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Search Offices
export const searchOffices = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      const offices = await Office.find({ isActive: true });
      return res.json({ success: true, data: offices });
    }

    const searchRegex = new RegExp(query, "i");
    const offices = await Office.find({
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

    res.json({ success: true, count: offices.length, data: offices });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Cities
export const getAllCities = async (req, res) => {
  try {
    const cities = await Office.distinct("location.city", { isActive: true });
    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOfficeFilters = async (req, res) => {
  try {
    const cities = await Office.distinct("location.city");
    const officeTypes = await Office.distinct("type");

    // Fetch all pricing fields
    const prices = await Office.find(
      { isActive: true },
      { pricing: 1, _id: 0 }
    );

    // Extract price arrays (default to 0 if missing)
    const monthlyPrices = prices.map((p) => p.pricing?.monthly || 0);
    const dailyPrices = prices.map((p) => p.pricing?.daily || 0);

    // Compute min/max for each type
    const monthlyMin = Math.min(...monthlyPrices);
    const monthlyMax = Math.max(...monthlyPrices);

    const dailyMin = Math.min(...dailyPrices);
    const dailyMax = Math.max(...dailyPrices);

    res.status(200).json({
      success: true,
      data: {
        cities,
        officeTypes,
        priceRange: {
          monthly: { min: monthlyMin, max: monthlyMax },
          daily: { min: dailyMin, max: dailyMax },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching filters:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  SEARCH / FILTER OFFICES
export const searchOfficesfilter = async (req, res) => {
  try {
    const { query, type, city, minPrice, maxPrice } = req.query;

    const filter = { isActive: true };

    if (query) {
      filter.$or = [
        { name: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
        { "location.city": new RegExp(query, "i") },
        { "location.address": new RegExp(query, "i") },
      ];
    }

    if (type) filter.type = type;
    if (city) filter["location.city"] = city;

    if (minPrice || maxPrice) {
      filter["pricing.monthly"] = {};
      if (minPrice) filter["pricing.monthly"].$gte = Number(minPrice);
      if (maxPrice) filter["pricing.monthly"].$lte = Number(maxPrice);
    }

    //  Fetch all matching offices with all fields
    const offices = await Office.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: offices,
    });
  } catch (err) {
    console.error("Error searching offices:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// // Toggle office Visibility
// // PATCH /api/admin/offices/:id/status
// export const toggleOfficeStatus = async (req, res) => {
//   try {
//     const office = await Office.findById(req.params.id);

//     if (!office) {
//       return res.status(404).json({ message: "Office not found" });
//     }

//     office.isActive = !office.isActive;
//     await office.save();

//     res.json({
//       message: "Office visibility updated",
//       isActive: office.isActive,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
