import React from "react";
import {
  FaMapMarkerAlt,
  FaBolt,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import PopupLeadForm from "./CityGurgaon/LeadForm";
import { useState } from "react";

const OfficeListingCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="bg-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Workspace Today
        </h2>
        <p className="text-gray-700 text-lg mb-10">
          Explore our wide range of coworking spaces, virtual offices, and
          flexible workspaces designed for professionals like you.
        </p>

        {/* Features / Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaCheckCircle className="text-blue-600 text-4xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Flexible Plans</h3>
            <p className="text-gray-600">
              Daily, monthly, and hourly plans to suit your business needs.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-red-500 w-7 h-7" />
            <h3 className="font-semibold text-xl mb-2">Prime Location</h3>
            <p className="text-gray-600">
              Choose from prestigious business addresses across India
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <FaBolt className="text-yellow-500 w-7 h-7" />
            <h3 className="font-semibold text-xl mb-2">Instant Booking</h3>
            <p className="text-gray-600">
              Book your preferred workspace in just a few clicks and get started
              immediately.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-block bg-blue-600 cursor-pointer text-white font-semibold text-lg py-4 px-8 rounded-lg hover:bg-blue-700 transition"
          >
            Find Your Space Now
          </button>
          <PopupLeadForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default OfficeListingCTA;
