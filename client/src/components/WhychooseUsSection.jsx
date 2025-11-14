import React from "react";

const WhyChooseUsSection = () => {
  // Content configuration based on office type

  const contentConfig = {
    "Virtual Office": {
      heading: "Why Choose Us for Your Virtual Office",
      ctaText: "Start Your Virtual Office Today",
      ctaColor: "bg-blue-600 hover:bg-blue-700",
      features: [
        {
          icon: "🏢",
          title: "Prestigious Business Address",
          description:
            "Build credibility with an address in recognized business hubs across major cities.",
        },
        {
          icon: "📄",
          title: "GST & MCA Compliant",
          description:
            "Approved spaces for seamless business registration and legal documentation.",
        },
        {
          icon: "📦",
          title: "Mail Handling & Support",
          description:
            "Professional mail reception and forwarding services for important business correspondence.",
        },
        {
          icon: "💻",
          title: "Completely Digital Setup",
          description:
            "End-to-end online KYC, verification, and document access through our dashboard.",
        },
        {
          icon: "💰",
          title: "Transparent Pricing",
          description:
            "No hidden fees or surprises. Pay only for what you actually need and use.",
        },
        {
          icon: "⚡",
          title: "Instant Activation",
          description:
            "Get your virtual office fully set up and operational within 24 hours.",
        },
      ],
    },
    "Coworking Space": {
      heading: "Why Choose Us for Your Coworking Space",
      ctaText: "Book Your Coworking Tour",
      ctaColor: "bg-green-600 hover:bg-green-700",
      features: [
        {
          icon: "🤝",
          title: "Thriving Community",
          description:
            "Collaborate daily with founders, freelancers, and innovative professionals.",
        },
        {
          icon: "🕓",
          title: "Flexible Membership Plans",
          description:
            "Choose from hourly, daily, or monthly passes that adapt to your workflow.",
        },
        {
          icon: "☕",
          title: "Premium Amenities",
          description:
            "High-speed Wi-Fi, meeting rooms, printing, and great coffee included.",
        },
        {
          icon: "🌇",
          title: "Prime City Locations",
          description:
            "Work in vibrant business districts with excellent transport connectivity.",
        },
        {
          icon: "🎯",
          title: "Productivity-Focused Design",
          description:
            "Spaces engineered to help you focus, create, and achieve your goals.",
        },
        {
          icon: "💡",
          title: "Networking Events",
          description:
            "Regular workshops and events to connect with like-minded innovators.",
        },
      ],
    },
  };

  // Get the appropriate content based on office type
  const content = contentConfig[officeType] || contentConfig["Coworking Space"];

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {office.Type === "Virtual Office"
              ? "Join 10,000+ businesses that trust us for their corporate identity and compliance needs."
              : "Join India's fastest-growing community of innovators, creators, and business leaders."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 hover:shadow-md transition-all duration-300 hover-lift group"
            >
              {/* Feature Icon */}
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-sm text-gray-600 font-medium">
                Happy Businesses
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">
                Cities Covered
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-sm text-gray-600 font-medium">
                Success Rate
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            className={`
              ${content.ctaColor}
              text-white font-semibold text-lg
              px-8 py-4 rounded-xl
              transition-all duration-300
              transform hover:scale-105
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-4 focus:ring-opacity-50
              ${
                officeType === "Virtual Office"
                  ? "focus:ring-blue-300"
                  : "focus:ring-green-300"
              }
            `}
          >
            {content.ctaText}
          </button>

          {/* CTA Subtext */}
          <p className="text-gray-600 mt-4 text-sm">
            {officeType === "Virtual Office"
              ? "No commitment required • Setup in 24 hours • Money-back guarantee"
              : "Free day pass available • No security deposit • Cancel anytime"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
