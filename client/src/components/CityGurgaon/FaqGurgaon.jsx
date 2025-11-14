import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const FaqGurgaon = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index, section) => {
    const key = `${section}-${index}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const coworkingFAQs = [
    {
      question: "Do coworking spaces offer private cabins?",
      answer:
        "Yes! We offer flexible hot desks, dedicated desks, and private cabins for teams of all sizes. Private cabins provide a secure, quiet workspace while still enjoying the benefits of a collaborative environment.",
    },
    {
      question: "What amenities are included in coworking spaces?",
      answer:
        "All our coworking spaces include high-speed WiFi, printing/scanning facilities, meeting rooms, refreshments, 24/7 access, air conditioning, and professional reception services.",
    },
    {
      question: "Can I book meeting rooms separately?",
      answer:
        "Absolutely! Members get discounted rates on meeting room bookings, and non-members can also book rooms by the hour for presentations, client meetings, or team discussions.",
    },
    {
      question: "Is there a minimum commitment period?",
      answer:
        "We offer flexible plans starting from daily passes to monthly and annual memberships. Choose what works best for your business needs.",
    },
    {
      question: "Can startups and freelancers use coworking spaces?",
      answer:
        "Yes! Coworking spaces are perfect for startups, freelancers, and growing teams who want a professional setup without the overhead of a traditional office.",
    },
    {
      question:
        "Are coworking spaces suitable for registered business addresses?",
      answer:
        "Definitely. Many of our coworking locations are compliant for GST, ROC, and MCA registration — giving your business a credible address instantly.",
    },
    {
      question: "Do you provide virtual office options with coworking plans?",
      answer:
        "Yes, you can combine your coworking membership with our Virtual Office plan — get a premium address for mail handling, GST, and MCA registration.",
    },
    {
      question: "What if my team grows in the future?",
      answer:
        "We make scaling easy! Upgrade to a bigger cabin or add more desks anytime without changing your address or paperwork.",
    },
    {
      question: "Is there parking available at coworking spaces?",
      answer:
        "Most of our coworking locations offer secure parking for both two-wheelers and four-wheelers. You can confirm availability while booking.",
    },
    {
      question: "How quickly can I start using the coworking space?",
      answer:
        "You can move in the same day! Once you complete a simple KYC process, your desk or cabin will be ready — no long waits, no hidden steps.",
    },
    {
      question: "Do coworking spaces have security and surveillance?",
      answer:
        "Yes, all spaces are equipped with 24x7 CCTV surveillance, biometric access, and dedicated on-site support staff to ensure a safe work environment.",
    },
    {
      question: "Why choose Asset Sense coworking spaces?",
      answer:
        "With prime locations, zero setup hassle, transparent pricing, and 24/7 support, Asset Sense helps your business operate smarter — not harder. Trusted by 10,000+ professionals across India.",
    },
  ];

  const virtualOfficeFAQs = [
    {
      question: "Can I register my company with a virtual office address?",
      answer:
        "Yes! Our virtual office addresses are 100% legal and accepted for company registration, GST registration, business licenses, and all official documentation.",
    },
    {
      question: "What's included in virtual office services?",
      answer:
        "Services include a prestigious business address, mail handling and forwarding, call answering services, GST registration support, and access to meeting rooms when needed.",
    },
    {
      question: "How does mail handling work?",
      answer:
        "We receive all your business mail, scan important documents, and notify you immediately. You can choose to have mail forwarded to your address or collect it during office hours.",
    },
    {
      question: "Can I use the business address on my website?",
      answer:
        "Yes! You can display the address on your website, business cards, marketing materials, and all official documents. It enhances your business credibility significantly.",
    },
    {
      question: "Can I register for GST with this address?",
      answer:
        "Yes. Our virtual office address is MCA- and GST-approved, so you can use it for GST registration without any issues.",
    },
    {
      question: "How fast will I get documents?",
      answer:
        "You will receive all necessary compliance documents like NOC, rent agreement, and utility bill within 24 hours of completing your KYC.",
    },
    {
      question: "Can I receive parcels and mail?",
      answer:
        "Yes. We provide mail handling services. You can collect parcels at the office, or request mail forwarding for added convenience.",
    },
    {
      question: "How long does activation take?",
      answer:
        "Activation usually takes less than 24 hours once we verify your documents and payment.",
    },
    {
      question: "Is mail forwarding included or extra?",
      answer:
        "Basic mail handling is included. Mail forwarding is available as an optional add-on depending on your needs.",
    },
    {
      question: "What about meeting room availability?",
      answer:
        "Our plans include access to professional meeting rooms on a booking basis. You can reserve slots in advance as per availability.",
    },
    {
      question: "Can I use this for company registration?",
      answer:
        "Yes. This address is valid for company incorporation with the Ministry of Corporate Affairs (MCA).",
    },
    {
      question: "What if my bank needs additional documents?",
      answer:
        "We provide complete compliance support. If your bank requires extra documents, our team will assist you with supplementary paperwork.",
    },
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Coworking FAQ Section */}
          <div className="animate-fade-in-up">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Coworking Spaces
            </h3>
            <div className="space-y-3">
              {coworkingFAQs.map((faq, index) => {
                const isOpen = openItems[`coworking-${index}`];
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleItem(index, "coworking")}
                    >
                      <span className="font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <FaChevronUp className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Virtual Office FAQ Section */}
          <div className="animate-fade-in-up">
            <h3 className="text-xl font-semibold text-[#17CFBF] mb-4">
              Virtual Offices
            </h3>
            <div className="space-y-3">
              {virtualOfficeFAQs.map((faq, index) => {
                const isOpen = openItems[`virtual-${index}`];
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleItem(index, "virtual")}
                    >
                      <span className="font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <FaChevronUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-green-100 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-8">
          Our workspace experts are just a message away. Get personalized help
          instantly on WhatsApp or reach out directly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919907800600"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
            Chat on WhatsApp
          </a>

          {/* Contact Us Button */}
          {/* <button className="inline-flex bg-blue-600 items-center justify-center gap-2 border border-gray-300 text-gray-100 hover:text-white hover:bg-gray-800 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300 transform hover:scale-105">
            <FaEnvelopeOpenText className="w-5 h-5" />
            Contact Us
          </button> */}
        </div>

        <p className="text-sm text-gray-500 mt-6">
          ✅ Fast replies • 💬 Human support • 🔒 No obligation
        </p>
      </div>
    </section>
  );
};

export default FaqGurgaon;
