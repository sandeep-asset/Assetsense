import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import OfficeForm from "../components/OfficeForm";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminDashboard = () => {
  const [offices, setOffices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    virtual: 0,
    coworking: 0,
    virtualandcoworking: 0,
  });
  const { user, loading: authLoading } = useAuth();

  const fetchOffices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/admin?limit=1000`);

      if (response.data.success) {
        const officesData = response.data.data.offices;
        setOffices(officesData);

        // Calculate statistics
        const total = officesData.length;
        const virtual = officesData.filter(
          (office) => office.type === "Virtual Office"
        ).length;
        const coworking = officesData.filter(
          (office) => office.type === "Coworking Space"
        ).length;
        const virtualandcoworking = officesData.filter(
          (office) => office.type === "Virtual and Coworking"
        ).length;

        setStats({
          total,
          virtual,
          coworking,
          virtualandcoworking,
        });
      } else {
        console.error("Error fetching offices:", response.data.message);
        alert("Error loading offices. Please try again.");
        toast.error("Error loading offices. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching offices:", error);
      if (error.response?.status === 401) {
        alert("Please login again");
      } else {
        toast.error("Error loading offices. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchOffices();
    }
  }, [user]);

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-gray-800">
            Are you sure you want to delete this office?
          </p>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  const response = await axios.delete(
                    `${backendUrl}/api/offices/${id}`
                  );

                  if (response.data.success) {
                    toast.success("Office Deleted Successfully", {
                      duration: 3000,
                    });
                    fetchOffices();
                  } else {
                    toast.error(
                      response.data.message || "Error deleting office",
                      { duration: 3000 }
                    );
                  }
                } catch (error) {
                  toast.error("Error deleting office. Please try again.", {
                    duration: 3000,
                  });
                }
              }}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // confirmation toast stays
        style: {
          padding: "16px",
          borderRadius: "8px",
          background: "#fff",
        },
      }
    );
  };

  const handleEdit = (office) => {
    setEditingOffice(office);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOffice(null);
    fetchOffices();
  };

  const handleAddNew = () => {
    setEditingOffice(null);
    setShowForm(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  // office toogle status
  const toggleOfficeStatus = async (officeId) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/api/admin/${officeId}/status`,
        {}
      );

      if (response.data.isActive !== undefined) {
        toast.success("Office status updated");

        // 🔥 Update UI instantly (no refetch needed)
        setOffices((prev) =>
          prev.map((office) =>
            office._id === officeId
              ? { ...office, isActive: response.data.isActive }
              : office
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update office status");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen md:mt-2 mt-10 bg-gray-50">
      {/* Header */}

      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your office listings
              </p>
            </div>

            {/* Add New Office Button */}
            <button
              onClick={handleAddNew}
              className="bg-blue-600 cursor-pointer text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            >
              <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add New Office
            </button>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Offices
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Virtual Offices
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.virtual}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Coworking Spaces
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.coworking}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Virtual and Coworking Spaces
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.virtualandcoworking}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Offices List */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Office Listings
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Manage all your office listings from this dashboard
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : offices.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No offices
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new office.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Office
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Office
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Features
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {offices.map((office) => (
                    <tr
                      key={office._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={
                                office.images?.[0] || "/placeholder-office.jpg"
                              }
                              alt={office.name}
                              onError={(e) => {
                                e.target.src = "/placeholder-office.jpg";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {office.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {office.capacity && `${office.capacity} people`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(office)}
                          className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer transition-colors font-medium"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* Toggle */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={office.isActive}
                              onChange={() => toggleOfficeStatus(office._id)}
                              className="sr-only peer"
                            />

                            {/* Track */}
                            <div
                              className="w-11 h-6 bg-red-300 rounded-full
        peer peer-checked:bg-green-500 transition-colors duration-300"
                            ></div>

                            {/* Thumb */}
                            <span
                              className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full
        transition-transform duration-300
        peer-checked:translate-x-5"
                            ></span>
                          </label>

                          {/* Status Text */}
                          <span
                            className={`ml-3 text-xs font-semibold leading-none ${
                              office.isActive
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {office.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            office.type === "Virtual Office"
                              ? "bg-[#13B3A5] text-white" // Teal for Virtual
                              : office.type === "Coworking Space"
                              ? "bg-blue-600 text-white" // Blue for Coworking
                              : office.type === "Virtual and Coworking"
                              ? "bg-purple-600 text-white" // Purple for both
                              : "bg-gray-500 text-white" // Fallback
                          }`}
                        >
                          {office.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {office.location.city}
                        </div>
                        <div className="text-sm text-gray-500">
                          {office.location.address}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {office.features.slice(0, 2).join(", ")}
                          {office.features.length > 2 && (
                            <span className="text-gray-500">
                              {" "}
                              +{office.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {office.pricing.yearly > 0 && (
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{office.pricing.yearly}/year
                          </div>
                        )}
                        {office.pricing.monthly > 0 && (
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{office.pricing.monthly}/month
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(office)}
                          className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(office._id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Showing {offices.length} office{offices.length !== 1 ? "s" : ""} •
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Office Form Modal */}
      {showForm && (
        <OfficeForm office={editingOffice} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default AdminDashboard;
