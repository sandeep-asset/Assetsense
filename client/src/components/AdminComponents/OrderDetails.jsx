import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`
        );
        if (res.data.success) setOrder(res.data.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
        <Link to="/admin/orders" className="text-blue-600 hover:underline">
          ← Back to Orders
        </Link>
      </div>

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p>
            <strong>Order ID:</strong> {order.paymentOrderId}
          </p>
          <p>
            <strong>Status:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Gateway:</strong> {order.paymentGateway}
          </p>
          <p>
            <strong>Office Type:</strong> {order.officeType}
          </p>
          <p>
            <strong>Created On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <p>
            <strong>Name:</strong> {order.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.user?.phone}
          </p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Office Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Office Details
        </h3>
        <p>
          <strong>Name:</strong> {order.office?.name}
        </p>
        <p>
          <strong>Type:</strong> {order.officeType}
        </p>
        <p>
          <strong>City:</strong> {order.office?.location?.city}
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-50 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Price Breakdown
        </h3>
        <p>
          <strong>Base Price:</strong> ₹{order.basePrice?.toFixed(2)}
        </p>
        {order.discountPercent > 0 && (
          <p>
            <strong>Discount:</strong> {order.discountPercent}%
          </p>
        )}
        <p>
          <strong>Discounted Price:</strong> ₹
          {order.discountedPrice?.toFixed(2)}
        </p>
        <p>
          <strong>Upsell Services Total:</strong> ₹
          {order.upsellTotal?.toFixed(2)}
        </p>
        <p>
          <strong>Subtotal:</strong> ₹{order.subtotal?.toFixed(2)}
        </p>
        <p>
          <strong>GST ({order.gstPercent}%):</strong> ₹
          {order.gstAmount?.toFixed(2)}
        </p>
        <p className="font-bold text-xl mt-2 text-gray-900">
          Total: ₹{order.totalAmount?.toFixed(2)}
        </p>

        {/* Savings */}
        {(order.totalSavings > 0 || order.upsellSavings > 0) && (
          <div className="mt-3 text-green-700 font-medium">
            <p>💰 Total Savings: ₹{order.totalSavings?.toFixed(2)}</p>
            {order.upsellSavings > 0 && (
              <p>Upsell Savings: ₹{order.upsellSavings?.toFixed(2)}</p>
            )}
          </div>
        )}
      </div>

      {/* Selected Services */}
      {order.services?.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Selected Upsell Services
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {order.services.map((s, i) => (
              <li key={i}>
                <div className="flex justify-between">
                  <span className="font-medium">{s.name}</span>
                  <span>
                    Regular: ₹{s.regularprice?.toFixed(2)} →{" "}
                    <strong>₹{s.assetsenseprice?.toFixed(2)}</strong>
                  </span>
                </div>
                {s.description && (
                  <p className="text-gray-500 text-sm">{s.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
