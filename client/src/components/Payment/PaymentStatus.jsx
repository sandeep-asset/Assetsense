// src/pages/PaymentStatus.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/orders/payment-status?order_id=${orderId}`
        );
        setStatus(res.data.status);
      } catch (err) {
        setStatus("error");
      }
    };

    if (orderId) fetchStatus();
  }, [orderId]);

  const renderStatus = () => {
    switch (status) {
      case "SUCCESS":
        return (
          <div className="text-center p-8 bg-green-50 border border-green-200 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-green-700 mb-3">
              ✅ Payment Successful!
            </h1>
            <p className="text-gray-700 mb-6">
              Your transaction has been completed successfully.
            </p>
            <a
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition-all"
            >
              Back to Home
            </a>
          </div>
        );

      case "FAILED":
      case "error":
        return (
          <div className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-red-600 mb-3">
              ❌ Payment Failed
            </h1>
            <p className="text-gray-700 mb-6">
              Something went wrong while processing your payment.
            </p>
            <a
              href="/checkout"
              className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition-all"
            >
              Try Again
            </a>
          </div>
        );

      case "PENDING":
        return (
          <div className="text-center p-8 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-yellow-600 mb-3">
              ⏳ Payment Pending
            </h1>
            <p className="text-gray-700 mb-6">
              We are waiting for payment confirmation. Please check back later.
            </p>
          </div>
        );

      default:
        return (
          <div className="text-center p-8">
            <p>Fetching payment details...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="max-w-md w-full">{renderStatus()}</div>
    </div>
  );
};

export default PaymentStatus;
