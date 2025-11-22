import Order from "../models/Order.js";
import Office from "../models/Office.js";
import { cashfree } from "../config/cashfreeConfig.js";
import crypto from "crypto";

// Create Order + initiate Cashfree payment

export const createOrder = async (req, res) => {
  try {
    const { officeId, selectedServices = [], user } = req.body;

    // Validate user
    if (!user?.email || !user?.phone || !user?.name) {
      return res.status(400).json({
        success: false,
        message: "User details (name, email, phone) are required.",
      });
    }

    // 1️⃣ Validate Office
    const office = await Office.findById(officeId);
    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }

    // 2️⃣ Base price
    const basePrice =
      office.type === "Virtual Office"
        ? Number(office?.pricing?.yearly) || 0
        : Number(office?.pricing?.monthly) || 0;

    // 3️⃣ Discount
    const discountPercent = Number(office?.pricing?.discount) || 0;
    const discountedPrice =
      discountPercent > 0
        ? basePrice - (basePrice * discountPercent) / 100
        : basePrice;

    // 4️⃣ Upsell totals
    const upsellTotal = selectedServices.reduce(
      (sum, s) => sum + Number(s.assetsenseprice || 0),
      0
    );

    const upsellSavings = selectedServices.reduce(
      (sum, s) =>
        sum + (Number(s.regularprice || 0) - Number(s.assetsenseprice || 0)),
      0
    );

    // 5️⃣ Subtotal + GST
    const subtotal = discountedPrice + upsellTotal;
    const gstPercent = Number(office?.gstPercent) || 18;
    const gstAmount = (subtotal * gstPercent) / 100;
    const totalAmount = Number((subtotal + gstAmount).toFixed(2));

    // 6️⃣ Savings
    const baseSaving = basePrice - discountedPrice;
    const totalSavings = baseSaving + upsellSavings;

    // 7️⃣ Create Order in DB FIRST
    const newOrder = await Order.create({
      office: office._id,
      officeType: office.type,

      user,
      services: selectedServices,
      basePrice,
      discountPercent,
      discountedPrice,
      upsellTotal,
      upsellSavings,
      subtotal,
      gstPercent,
      gstAmount,
      totalAmount,
      totalSavings,
      paymentStatus: "PENDING",
    });

    // 8️⃣ Create Cashfree Order
    const cashfreeOrderId = `ASSET_${Date.now()}`; // Safe format

    const response = await cashfree.post("/orders", {
      order_id: cashfreeOrderId,
      order_amount: totalAmount,
      order_currency: "INR",

      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: user.name,
        customer_email: user.email,
        customer_phone: user.phone,
      },

      order_meta: {
        return_url: `${process.env.CLIENT_URL}/payment-status?order_id={order_id}`,
        notify_url: `${process.env.SERVER_URL}/api/orders/webhook`, // VERY IMPORTANT
      },

      order_note: `Payment for ${office.name}`,
    });

    // 9️⃣ Save Cashfree details
    newOrder.paymentOrderId = response.data.order_id;
    newOrder.paymentSessionId = response.data.payment_session_id;
    await newOrder.save();

    // 🔟 Send success response
    return res.status(200).json({
      success: true,
      orderId: newOrder._id,
      cfOrderId: response.data.order_id,
      paymentSessionId: response.data.payment_session_id,
      totalAmount,
      totalSavings,
      discountedPrice,
      upsellTotal,
      gstAmount,
    });
  } catch (error) {
    console.error(
      "❌ Cashfree Order Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Payment initialization failed",
      error: error.response?.data,
    });
  }
};

// CASHFREE WEBHOOK
export const verifyPaymentWebhook = async (req, res) => {
  try {
    const rawBody = req.body;
    const data = JSON.parse(rawBody);
    const orderId = data?.data?.order?.order_id;
    const paymentStatus = data?.data?.payment?.payment_status;
    const paymentRef = data?.data?.payment?.cf_payment_id;

    if (!orderId) {
      return res
        .status(400)
        .json({ error: "Invalid Webhook: order_id missing" });
    }

    // Update DB
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentOrderId: orderId }, // match DB field
      {
        paymentStatus: paymentStatus === "SUCCESS" ? "SUCCESS" : "FAILED",
        paymentReferenceId: paymentRef,
      },
      { new: true }
    );

    if (!updatedOrder) {
      console.log("❌ No order found for", orderId);
      return res.status(404).json({ error: "Order not found in DB" });
    }

    res.status(200).send("Webhook processed");
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).send("Server error");
  }
};

// export const verifyPaymentWebhook = async (req, res) => {
//   try {
//     const secret = process.env.CASHFREE_API_SECRET;

//     // Required Cashfree headers
//     const signature = req.headers["x-webhook-signature"];
//     const timestamp = req.headers["x-webhook-timestamp"];

//     // IMPORTANT: raw body required
//     const rawBody = req.rawBody;

//     // Create the string Cashfree wants
//     const stringToSign = timestamp + rawBody;

//     // Generate expected signature
//     const expectedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(stringToSign)
//       .digest("base64");

//     // Compare signatures
//     if (signature !== expectedSignature) {
//       console.log("❌ Invalid Cashfree webhook signature");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }
//     console.log("Webhook Received:", data);

//     console.log("✅ Webhook Signature Verified",signature);

//     const event = req.body;
//     const eventType = event?.type; // e.g., PAYMENT_SUCCESS, PAYMENT_FAILED
//     const cfOrderId = event?.data?.order?.order_id;
//     const payment = event?.data?.payment;

//     if (!cfOrderId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing order_id" });
//     }

//     // Convert Cashfree event → your model enum
//     let paymentStatus = "PENDING";

//     if (eventType === "PAYMENT.SUCCESS") {
//       paymentStatus = "SUCCESS";
//     } else if (eventType === "PAYMENT.FAILED") {
//       paymentStatus = "FAILED";
//     } else {
//       console.log("Ignoring event:", eventType);
//       return res.status(200).json({ success: true });
//     }

//     const cfPaymentId = payment?.cf_payment_id;

//     const updatedOrder = await Order.findOneAndUpdate(
//       { paymentOrderId: cfOrderId },
//       {
//         $set: {
//           paymentStatus,
//           paymentReferenceId: cfPaymentId,
//           transactionDate: new Date(),
//           webhookPayload: event,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       console.log("❌ Order not found for:", cfOrderId);
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     console.log("🔥 PAYMENT UPDATED →", updatedOrder.paymentStatus);

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Webhook Error:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// All Orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("office", "name type location.city") // get office details
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// ✅ Get single order (for detailed view)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "office",
      "name type location city pricing"
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};

// DELETE Order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};

//Get Payment status
// GET PAYMENT STATUS
export const getPaymentStatus = async (req, res) => {
  try {
    const orderId = req.query.order_id;

    if (!orderId) {
      return res
        .status(400)
        .json({ status: "error", message: "order_id missing" });
    }

    const order = await Order.findOne({ paymentOrderId: orderId });

    if (!order) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }

    // Map DB value to frontend
    const mappedStatus =
      order.paymentStatus === "PAID" ? "SUCCESS" : order.paymentStatus;

    return res.json({ status: mappedStatus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error" });
  }
};
