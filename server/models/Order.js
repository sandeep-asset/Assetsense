import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
      required: true,
    },

    // Selected upsell services
    services: [
      {
        name: String,
        regularprice: Number,
        assetsenseprice: Number,
        description: String,
      },
    ],

    user: {
      name: String,
      email: String,
      phone: String,
    },

    officeType: {
      type: String,
      enum: ["Virtual Office", "Coworking Space", "Virtual and Coworking"],
    },

    // 💰 Pricing breakdown
    basePrice: { type: Number, required: true }, // Original office price
    discountPercent: { type: Number, default: 0 },
    discountedPrice: { type: Number, required: true }, // After discount

    upsellTotal: { type: Number, default: 0 }, // Total of selected upsell services
    upsellSavings: { type: Number, default: 0 }, // Sum of (regularprice - assetsenseprice)

    subtotal: { type: Number, required: true }, // discountedPrice + upsellTotal
    gstPercent: { type: Number, default: 18 },
    gstAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    // 🎁 Combined total savings (discount + upsell)
    totalSavings: { type: Number, default: 0 },

    // 💳 Payment tracking
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "USER DROPPED"],
      default: "PENDING",
    },
    paymentOrderId: String,
    paymentReferenceId: String,
    paymentGateway: { type: String, default: "Cashfree" },

    // Metadata
    transactionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
