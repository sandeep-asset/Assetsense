import React, { useState } from "react";

import {
  FaMapMarkerAlt,
  FaFileAlt,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import PopupLeadForm from "./LeadForm";

const Virtual = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#58f0e6] text-black border border-[#20f7e8] text-sm font-medium mb-4">
            Professional Presence
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-[#17CFBF]">Virtual Office </span>for Business
            Registration
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Establish your business presence with a prestigious address. Perfect
            for GST registration, company formation, and building credibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-6 animate-fade-in-up order-2 md:order-1">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#1e7973] p-3 rounded-lg">
                <FaMapMarkerAlt className="h-6 w-6 text-[#a8c9c7]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Prime Business Address
                </h3>
                <p className="text-gray-600">
                  Get a prestigious address in premium business districts
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#3c6462] p-3 rounded-lg">
                <FaFileAlt className="h-6 w-6 text-[#18CBBF]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  GST & Registration Support
                </h3>
                <p className="text-gray-600">
                  Hassle-free company registration and GST documentation
                  assistance
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#548d89] p-3 rounded-lg">
                <FaEnvelope className="h-6 w-6 text-[#18CBBF]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Mail Handling
                </h3>
                <p className="text-gray-600">
                  Professional mail receiving, scanning, and forwarding services
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#4b7471] p-3 rounded-lg">
                <FaPhone className="h-6 w-6 text-[#18CBBF]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Call Management
                </h3>
                <p className="text-gray-600">
                  Professional call answering and forwarding in your company
                  name
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center text-sm gap-2 bg-[#17CFBF] cursor-pointer hover:bg-[#6eeee3] text-black shadow-lg  px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Virtual Offices
            </button>

            <PopupLeadForm
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
            />
          </div>

          <div className="animate-fade-in-up order-1 md:order-2">
            <img
              src="/virtual1.jpg"
              alt="Professional virtual office reception area"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Virtual;
