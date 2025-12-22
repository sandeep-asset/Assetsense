import { useState } from "react";

const TargetAudience = () => {
  const [openItems, setOpenItems] = useState([]);

  const audiences = [
    {
      title: "Start-up India",
      subtitle: "Apply startup India certificate",
      description:
        "Offering compliant virtual office address for registration, drafting, and end-to-end support to startup india certificate apply successfully. ",
      details: [
        "Expert drafting for startup india certificate innovation write-ups.",
        "End-to-end startup india certificate apply and profile submission.",
        "स्टार्टअप इंडिया सर्टिफिकेट व जीएसटी रजिस्ट्रेशन हेतु वैध वर्चुअल ऑफिस का पता।",
        "स्टार्टअप इंडिया सर्टिफिकेट आवेदन व इनोवेशन राइट-अप तैयार करने में विशेषज्ञ सहायता।",
      ],
    },
    {
      title: "Amazon / Flipkart Sellers",
      subtitle: "needing multi-state GST",
      description:
        "Lowest Cost Setup, VPOB/APOB for New Resellers Minimize gst registration fees using the cheapest virtual office solution for your startup documentation.",
      details: [
        "Start your Amazon business instantly by securing a compliant virtual office address that meets all government criteria. This is the perfect solution if you are wondering online business ke liye gst number kaise le without renting a physical shop. ",
        "Amazon strictly requires a professional business address and not a residential one for better approval rates. We provide a registered office address with a valid NOC and Rent Agreement to ensure your seller account is verified smoothly. ",
        "Don't spend your capital on rent; use the cheapest virtual office solution to get your documentation done. We help you save on gst registration fees and overheads so you can invest more in your inventory. ",
        "If you want to store inventory in Amazon warehouses in major hubs, use our virtual office for GST registration in Delhi (or other states). This allows you to expand your reach without managing physical offices in every city. ",
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
      title: "Udyog Aadhar (MSME)",
      subtitle: "Udyam Registration",
      description:
        "Asset Sense ki madad se MSME aur Laghu Udyog register karein aur government schemes ka labh lein. ",
      details: [
        "Service for Loan Eligibility: We select the correct NIC Codes during your Udyam registration to ensure your business qualifies for collateral-free government loans.",
        "Service for Subsidies: Our compliant Virtual Office Address ensures your MSME application is approved without rejection, unlocking the 50% discount on Trademark & Patent fees.",
        "Payment Protection Service: Asset Sense से सही Udyog Aadhar (MSME) रजिस्ट्रेशन करवाएं और ग्राहकों से पेमेंट में देरी होने पर कानूनी सुरक्षा (Payment Protection) पाएं।",
        "Banking Benefit Service: हमारे Bank-Valid Rent Agreement से अपना करंट अकाउंट खुलवाएं और बैंक से ओवरड्राफ्ट (OD) पर ब्याज दर में छूट का लाभ उठाएं।",
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
    <section id="startups" className="py-25 relative bg-[var(--color-primary)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-heading)]">
            Is This For{" "}
            <span className="text-[var(--color-important)]">
              Your Business ?
            </span>
          </h2>
          <p className="text-md font-semibold text-[var(--color-subheading)] max-w-2xl mx-auto">
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
                className="border border-[var(--color-secondary)] rounded-xl overflow-hidden bg-[var(--color-secondary)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer group"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        {iconComponents[index]}
                      </div>

                      <div className="text-left">
                        <h3 className="font-semibold text-lg text-[var(--color-heading)]">
                          {audience.title}
                        </h3>
                        <p className="text-sm text-[var(--color-subheading)]">
                          {audience.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronDown isOpen={isOpen} />
                  </div>

                  <p className="text-[var(--color-description)] mt-4 text-left">
                    {audience.description}
                  </p>
                  <button className="hover:bg-[#49925b] text-gray-900 bg-gray-300 cursor-pointer mt-3 hover:text-gray-100 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-lg font-semibold text-base sm:text-sm transition w-full sm:w-auto">
                    [See Benefits Below] ↓
                  </button>
                </div>

                {isOpen && (
                  <div className="bg-[#fff] border-t border-blue-100 p-4">
                    <ul className="space-y-1">
                      {audience.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-4 text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-2"></div>
                          <span>{detail}</span>
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
      <div className="items-center flex mt-10 justify-center">
        <a
          href="https://assetsense.in/"
          target="_blank" // opens in new tab (optional)
          rel="noopener noreferrer"
          className="bg-blue-600 text-gray-100 text-lg px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#267985] hover:to-green-600 transform hover:-translate-y-1"
        >
          Visit Main Website
        </a>
      </div>
    </section>
  );
};

export default TargetAudience;
