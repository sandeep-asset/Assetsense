import React from "react";
import PopupForm from "../PopupForm";
import { useState } from "react";

const PlansGurgaon = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");

  const handleOpenForm = (title) => {
    setFormTitle(title);
    setIsFormOpen(true);
  };
  const plans = [
    {
      title: "New Company Registration Plan",
      description:
        "Register your company at premium addresses in any city in India without taking a physical office space.",
      features: [
        "New Company Registration Address",
        "New GST Registration, GST Registration for APOB",
        "Mail & Courier Handling, Address on Business Cards, Letter Heads",
      ],
    },
    {
      title: "GST Registration Plan",
      description:
        "Expand your existing business to new states in the country. GST registration for Additional place of business (APOB).",
      features: [
        "New GST Registration, GST Registration for APOB",
        "Mail & Courier Handling, Address on Business Cards, Letter Heads",
      ],
    },
    {
      title: "Business Address Plan",
      description:
        "Get a professional business address for your company at prime locations.",
      features: [
        "Mail & Courier Handling, Address on Business Cards, Letter Heads",
      ],
    },
  ];

  const customSolutions = {
    title: "Looking for a customised solution?",
    description: "Connect with our experts now.",
    options: [
      "Permanent signage",
      "Fixed Seat",
      "Day Pass",
      "Meeting Room hours",
    ],
    buttonText: "Request Callback",
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose a Virtual Office based on your needs
        </h2>

        {/* Plans Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {/* Button pushed to bottom */}
              <button
                onClick={() => handleOpenForm("Reserve My Address")}
                className="mt-auto w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Explore Workspaces
              </button>
            </div>
          ))}
        </div>

        {/* Custom Solution Section */}
        <div className="mt-16 bg-gray-100 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">{customSolutions.title}</h3>
          <p className="mb-6">{customSolutions.description}</p>

          <div className="flex justify-center">
            <ul className="mb-6 list-disc list-inside space-y-2 text-left">
              {customSolutions.options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => handleOpenForm("Reserve My Address")}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            {customSolutions.buttonText}
          </button>
          <PopupForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            formTitle={formTitle}
          />
        </div>
      </div>
    </section>
  );
};

export default PlansGurgaon;
