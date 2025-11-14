import { useState } from "react";

const TargetAudience = () => {
  const [openItems, setOpenItems] = useState([]);

  const audiences = [
    {
      title: "Start-ups & SMEs",
      subtitle: "launching in NCR",
      description:
        "Perfect for new businesses that need a professional address without the overhead of physical office space.",
      details: [
        "MCA registration support",
        "Bank account opening assistance",
        "Professional business address",
        "Mail handling and forwarding",
      ],
    },
    {
      title: "Amazon / Flipkart Sellers",
      subtitle: "needing multi-state GST",
      description:
        "Essential for e-commerce sellers who need GST registration across multiple states.",
      details: [
        "Multi-state GST registration",
        "vpob gst",
        "Return address for customers",
        "Virtual office space in India (any city)",
      ],
    },
    {
      title: "Consultants & Freelancers",
      subtitle: "who work remote but need a city HQ",
      description:
        "Ideal for independent professionals who need a corporate presence.",
      details: [
        "Professional meeting rooms",
        "Office Space for Online Business",
        "virtual office on rent",
        "Corporate image enhancement",
      ],
    },
    {
      title: "Global Companies",
      subtitle: "testing Indian market",
      description:
        "Perfect for international businesses entering the Indian market.",
      details: [
        "Market entry support",
        "Regulatory compliance",
        "Local presence establishment",
        "Virtual address for company registration in India",
      ],
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // SVG Icons for each category
  const iconComponents = [
    // Users icon (Start-ups & SMEs)
    <svg
      key="users"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3196a5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>,
    // Shopping Cart icon (Amazon/Flipkart Sellers)
    <svg
      key="cart"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3196a5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>,
    // Briefcase icon (Consultants & Freelancers)
    <svg
      key="briefcase"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3196a5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>,
    // Globe icon (Global Companies)
    <svg
      key="globe"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3196a5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>,
  ];

  // Chevron Down icon
  const ChevronDown = ({ isOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3196a5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <section className="py-20 relative bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Is This For You?
          </h2>
          <p className="text-xl text-gray-black max-w-2xl mx-auto">
            Perfect for businesses of all sizes looking for professional
            presence without the overhead
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => {
            const isOpen = openItems.includes(index);

            return (
              <div
                key={index}
                className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer group"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        {iconComponents[index]}
                      </div>

                      <div className="text-left">
                        <h3 className="font-semibold text-lg text-black">
                          {audience.title}
                        </h3>
                        <p className="text-sm text-black">
                          {audience.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronDown isOpen={isOpen} />
                  </div>

                  <p className="text-black mt-4 text-left">
                    {audience.description}
                  </p>
                  <button className="hover:bg-[#49925b] text-black bg-gray-200 cursor-pointer mt-3 hover:text-gray-100 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-lg font-semibold text-base sm:text-sm transition w-full sm:w-auto">
                    [See Benefits Below] ↓
                  </button>
                </div>

                {isOpen && (
                  <div className="bg-[#fff] border-t border-blue-100 p-4">
                    <ul className="space-y-2">
                      {audience.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center gap-2 text-sm text-black"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
