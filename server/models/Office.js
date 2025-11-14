import mongoose from "mongoose";
import slugify from "slugify";

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      zip: {
        type: String,
        required: true,
        trim: true,
      },
    },
    type: {
      type: String,
      enum: ["Virtual Office", "Coworking Space", "Virtual and Coworking"],
      required: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    pricing: {
      discount: {
        type: Number,
      },
      yearly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
      daily: {
        type: Number,
        min: 0,
      },
      hourly: {
        type: Number,
        min: 0,
      },
    },

    specialtag: {
      type: String,
    },
    gstPercent: {
      type: Number,
      default: 18, // default value
      min: 0,
      max: 100,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 0,
    },
    //services offered at the office
    services: [
      {
        name: { type: String, required: true, trim: true },
        price: { type: String, required: true, min: 0 },
        description: { type: String, trim: true },
      },
    ],
    upsellservices: [
      {
        name: { type: String, required: true, trim: true },
        regularprice: { type: String, required: true, min: 0 },
        assetsenseprice: { type: String, required: true, min: 0 },
        description: { type: String, trim: true },
      },
    ],

    slug: {
      type: String,
      unique: true,
      index: true,
    },
    mapEmbed: {
      type: String, // will store the iframe embed code or Google Maps URL
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate unique SEO-friendly slug
officeSchema.pre("save", async function (next) {
  if (!this.isModified("name") && !this.isModified("location") && this.slug) {
    return next();
  }

  const baseSlug = slugify(
    `${this.type}-${this.location.city}-${this.name || this.location.address}`,
    { lower: true, strict: true }
  );

  let slug = baseSlug;
  let count = 1;

  // Ensure uniqueness
  const Office = mongoose.model("Office");
  while (await Office.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.slug = slug;
  next();
});

const Office = mongoose.model("Office", officeSchema);

export default Office;
