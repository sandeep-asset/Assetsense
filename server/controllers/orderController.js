import Order from "../models/Order.js";
import Office from "../models/Office.js";
import { cashfree } from "../config/cashfreeConfig.js";
import crypto from "crypto";

// Create Order + initiate Cashfree payment

export const createOrder = async (req, res) => {
  try {
    const { officeId, selectedServices = [], user } = req.body;

    if (!user?.email || !user?.phone || !user?.name) {
      return res.status(400).json({
        success: false,
        message: "User details (name, email, phone) are required.",
      });
    }

    // 1️⃣ Validate office
    const office = await Office.findById(officeId);
    if (!office) {
      return res.status(404).json({
        success: false,
        message: "Office not found",
      });
    }

    // 2️⃣ Determine base price
    let basePrice = 0;
    if (office.type === "Virtual Office") {
      basePrice = Number(office?.pricing?.yearly) || 0;
    } else {
      basePrice = Number(office?.pricing?.monthly) || 0;
    }

    // 3️⃣ Apply discount
    const discountPercent = Number(office?.pricing?.discount) || 0;
    let discountedPrice = basePrice;
    if (discountPercent > 0) {
      discountedPrice = basePrice - (basePrice * discountPercent) / 100;
    }

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

    // 5️⃣ Subtotal + GST + total
    const subtotal = discountedPrice + upsellTotal;
    const gstPercent = Number(office?.gstPercent) || 18;
    const gstAmount = (subtotal * gstPercent) / 100;
    const totalAmount = subtotal + gstAmount;

    // 6️⃣ Total savings
    const baseDiscountSaving = basePrice - discountedPrice;
    const totalSavings = baseDiscountSaving + upsellSavings;

    // 7️⃣ Create order in DB
    const order = await Order.create({
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

    // 8️⃣ Create Cashfree payment order
    const response = await cashfree.post("/orders", {
      order_id: `order_${Date.now()}`,
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: Date.now().toString(),
        customer_email: user.email,
        customer_phone: user.phone,
      },
      order_meta: {
        return_url: `${process.env.CLIENT_URL}/payment-status?order_id={order_id}`,
      },
      order_note: `Payment for ${office.name}`,
    });

    // 9️⃣ Save Cashfree IDs
    order.paymentOrderId = response.data.order_id;
    order.paymentSessionId = response.data.payment_session_id;
    await order.save();

    // 🔟 Respond
    res.status(200).json({
      success: true,
      orderId: order._id,
      paymentSessionId: response.data.payment_session_id,
      totalAmount,
      totalSavings,
      discountedPrice,
      upsellTotal,
      gstAmount,
    });
  } catch (err) {
    console.error(
      "❌ Cashfree order error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};

//verify payment
// export const verifyPaymentWebhook = async (req, res) => {
//   try {
//     const secret = process.env.CASHFREE_WEBHOOK_SECRET;
//     const signature = req.headers["x-webhook-signature"];
//     const payload = JSON.stringify(req.body);

//     // 1️⃣ Verify signature authenticity
//     const expectedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(payload)
//       .digest("base64");

//     if (signature !== expectedSignature) {
//       console.log("❌ Invalid Cashfree signature");
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid signature" });
//     }

//     // 2️⃣ Extract key details from webhook payload
//     const event = req.body;
//     const cf_order_id = event?.data?.order?.order_id;
//     const payment_status = event?.data?.payment?.payment_status?.toUpperCase();

//     if (!cf_order_id) {
//       console.log("⚠️ Missing order_id in webhook payload");
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing order_id" });
//     }

//     console.log("📦 Webhook received for:", cf_order_id, payment_status);

//     // 3️⃣ Update your order record
//     const updatedOrder = await Order.findOneAndUpdate(
//       { paymentOrderId: cf_order_id }, // ✅ this should match what you saved during createOrder
//       { paymentStatus: payment_status, transactionDate: new Date() },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       console.log("⚠️ No matching order found for:", cf_order_id);
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     console.log("✅ Order updated:", updatedOrder._id, "→", payment_status);
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const verifyPaymentWebhook = async (req, res) => {
//   try {
//     const secret = process.env.CASHFREE_WEBHOOK_SECRET;
//     const signature = req.headers["x-webhook-signature"];
//     const payload = JSON.stringify(req.body);

//     // ✅ Verify signature
//     const expectedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(payload)
//       .digest("base64");

//     if (signature !== expectedSignature) {
//       console.log("Invalid Cashfree signature");
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid signature" });
//     }

//     const event = req.body;
//     const eventType = event?.type;
//     if (!["PAYMENT.SUCCESS", "PAYMENT.FAILED"].includes(eventType)) {
//       console.log("Ignored event:", eventType);
//       return res.status(200).json({ success: true });
//     }

//     const cf_order_id = event?.data?.order?.order_id;
//     const payment_status = event?.data?.payment?.payment_status?.toUpperCase();
//     const cf_payment_id = event?.data?.payment?.cf_payment_id;

//     if (!cf_order_id) {
//       console.log("Missing order_id in webhook payload");
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing order_id" });
//     }

//     console.log("Webhook received:", cf_order_id, payment_status);

//     const updatedOrder = await Order.findOneAndUpdate(
//       { paymentOrderId: cf_order_id },
//       {
//         paymentStatus: payment_status,
//         transactionDate: new Date(),
//         paymentReferenceId: cf_payment_id || undefined,
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       console.log("No matching order found for:", cf_order_id);
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     console.log("Order updated:", updatedOrder._id, "→", payment_status);
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Webhook error:", error.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const verifyPaymentWebhook = async (req, res) => {
  console.log("Cashfree test webhook received");
  return res.status(200).json({ status: "OK" });
};

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
