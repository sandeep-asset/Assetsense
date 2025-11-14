import React from "react";
import { FaWifi, FaUsers, FaCoffee, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaWifi />,
    title: "High-Speed WiFi",
    description:
      "Stay productive with lightning-fast internet in all our offices.",
  },
  {
    icon: <FaUsers />,
    title: "Flexible Seating",
    description:
      "Hot desks, dedicated desks, and private offices to suit every need.",
  },
  {
    icon: <FaCoffee />,
    title: "Refreshments Included",
    description:
      "Enjoy complimentary coffee, tea, and snacks throughout the day.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Workspaces",
    description: "24/7 security and CCTV to keep you and your data safe.",
  },
];

const FeaturesGrid = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 mb-10">
          Our coworking and virtual office spaces are designed to make your work
          easier and more productive.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition"
            >
              <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
