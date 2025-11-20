import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/all`
      );
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col items-start">
          <p className="font-semibold text-gray-800 mb-2">
            Are you sure you want to delete this order?
          </p>
          <div className="flex justify-between w-full gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 cursor-pointer bg-gray-200 text-gray-800 text-sm rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const res = await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`
                  );
                  if (res.data.success) {
                    toast.success("Order deleted successfully");
                    setOrders((prev) => prev.filter((o) => o._id !== id));
                  } else {
                    toast.error("Failed to delete order");
                  }
                } catch (err) {
                  console.error("Error deleting order:", err);
                  toast.error("Something went wrong");
                }
              }}
              className="px-3 py-1 bg-red-500 cursor-pointer text-white text-sm rounded-lg hover:bg-red-600 transition"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SUCCESS":
        return <FaCheckCircle className="text-green-500" />;
      case "FAILED":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-10 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
        Orders Dashboard
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs sm:text-sm">
            <tr>
              <th className="py-3 px-4 text-left min-w-[130px]">Order ID</th>
              <th className="py-3 px-4 text-left min-w-[150px]">User</th>
              <th className="py-3 px-4 text-left min-w-[220px] w-[25%]">
                Office
              </th>
              <th className="py-3 px-4 text-left min-w-[100px]">Total (₹)</th>
              <th className="py-3 px-4 text-left min-w-[120px]">Status</th>
              <th className="py-3 px-4 text-left min-w-[120px]">Date</th>
              <th className="py-3 px-4 text-center min-w-[150px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                {/* Order ID */}
                <td className="py-3 px-4 break-words text-gray-600">
                  {order.paymentOrderId || "N/A"}
                </td>

                {/* User */}
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">
                    {order.user?.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {order.user?.email}
                  </p>
                </td>

                {/* Office */}
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {order.office?.name || "N/A"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {order.office?.location?.city || "—"}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-3 px-4 font-semibold text-gray-800">
                  ₹{order.totalAmount?.toFixed(2)}
                </td>

                {/* Status */}
                <td className="py-3 px-4 flex items-center gap-2">
                  {getStatusIcon(order.paymentStatus)}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "SUCCESS"
                        ? "text-green-600"
                        : order.paymentStatus === "FAILED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="py-3 px-2 flex justify-center items-center gap-3 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="inline-flex items-center cursor-pointer gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xs sm:text-sm"
                  >
                    <FaEye /> View
                  </button>

                  <button
                    onClick={() => handleDelete(order._id)}
                    className="inline-flex items-center cursor-pointer gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
