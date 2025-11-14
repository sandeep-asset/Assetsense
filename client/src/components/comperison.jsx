import React, { useState } from "react";
import PopupLeadForm from "./CityGurgaon/LeadForm";
import {
  FaMapMarkerAlt,
  FaFileSignature,
  FaMoneyBillWave,
  FaChartLine,
  FaTags,
  FaHeadset,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";

const ModernComparisonSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const features = [
    {
      icon: <FaMapMarkerAlt className="text-blue-600 text-3xl" />,
      title: "Prime Locations Nationwide",
      description:
        "Access prestigious business addresses across 50+ Indian cities.",
    },
    {
      icon: <FaFileSignature className="text-blue-600 text-3xl" />,
      title: "100% Digital KYC & Agreement",
      description: "Complete all formalities online — zero paperwork hassle.",
    },
    {
      icon: <FaMoneyBillWave className="text-blue-600 text-3xl" />,
      title: "Money-Back Guarantee",
      description:
        "Full refund in case of GST/MCA rejection — absolutely risk-free.",
    },
    {
      icon: <FaChartLine className="text-blue-600 text-3xl" />,
      title: "Unified Virtual Office Dashboard",
      description: "Manage invoices, KYC & agreements in one simple dashboard.",
    },
    {
      icon: <FaTags className="text-blue-600 text-3xl" />,
      title: "Transparent, Lowest Pricing",
      description: "Flat, honest pricing — no setup or renewal surprises.",
    },
    {
      icon: <FaHeadset className="text-blue-600 text-3xl" />,
      title: "Dedicated Support Team",
      description: "Get instant assistance for all GST or MCA-related queries.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Why <span className="text-blue-600">Asset Sense</span> is the
            Trusted Choice
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Thousands of businesses choose Asset Sense for speed, simplicity,
            and reliability.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-2 shadow-sm">
            <FaStar className="text-yellow-500" />
            <span className="text-gray-800 text-sm font-semibold">
              4.9★ Google Rating
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-2 shadow-sm">
            <FaCheckCircle className="text-green-500" />
            <span className="text-gray-800 text-sm font-semibold">
              10K+ Businesses Served
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-2 shadow-sm">
            <FaShieldAlt className="text-blue-500" />
            <span className="text-gray-800 text-sm font-semibold">
              Govt. Verified & Secure
            </span>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
            >
              <div className="flex justify-center mb-3">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mx-auto max-w-[240px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-16 flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            Get Started with Asset Sense
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919907800600"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 hover:scale-105 transition"
          >
            <FaWhatsapp className="text-2xl" /> Talk to an Expert
          </a>
        </div>

        {/* CTA Subtitle */}
        <p className="text-gray-500 text-sm mt-4 text-center">
          100% Secure | Instant Activation | No Hidden Charges
        </p>

        {/* Popup Lead Form */}
        <PopupLeadForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </div>
    </section>
  );
};

export default ModernComparisonSection;
