import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaWifi,
  FaCoffee,
  FaCar,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaClock,
  FaConciergeBell,
} from "react-icons/fa";

const OfficeCard = ({ office, compact = false }) => {
  const { slug } = useParams();

  // Feature icons mapping
  const getFeatureIcon = (feature) => {
    const featureIcons = {
      wifi: FaWifi,
      coffee: FaCoffee,
      parking: FaCar,
      security: FaShieldAlt,
      "meeting rooms": FaUsers,
      "24/7 access": FaClock,
      reception: FaConciergeBell,
    };
    return featureIcons[feature.toLowerCase()] || FaStar;
  };

  const generateDescription = (office) => {
    const features = office.features || [];
    const type = office.type?.toLowerCase() || "";
    const capacity = office.capacity || "";
    const city = office.location?.city || "your city";

    const sentence1Options = [
      `Ideal for ${capacity ? `${capacity}-person ` : ""}teams seeking ${
        type === "virtual office"
          ? "a professional business address"
          : "a flexible workspace"
      }.`,
      `Modern ${type} in ${city} with ${features[0] || "premium amenities"}.`,
      `Experience a ${type} designed for productivity and comfort.`,
    ];

    const sentence2Options = [
      `Features ${features.slice(0, 2).join(", ").toLowerCase()}${
        features.length > 2 ? " and more" : ""
      }.`,
      `Includes ${
        features.length || "many"
      }+ workspace features and amenities.`,
      `Perfect balance of privacy, comfort, and collaboration.`,
    ];

    const s1 =
      sentence1Options[Math.floor(Math.random() * sentence1Options.length)];
    const s2 =
      sentence2Options[Math.floor(Math.random() * sentence2Options.length)];

    return `${s1} ${s2}`;
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-visible group">
      {/* Image Section */}
      <div className="relative overflow-visible rounded-t-xl">
        {/* 🌟 Special Tag — half outside top-right */}
        {office.specialtag && (
          <div className="absolute -top-3 right-3 ">
            <span
              className={`relative px-2 py-1 z-1 rounded text-xs font-semibold shadow-lg  tracking-wide border border-white/40
                    ${
                      office.specialtag === "Primium"
                        ? "bg-gradient-to-r from-[#cf174e] via-red-500 to-[#cf1798] text-white"
                        : office.specialtag === "Best Value"
                        ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white"
                        : office.specialtag === "Affordable"
                        ? "bg-gradient-to-r from-[#ec430f] via-[#cfbd17] to-[#51cf17] text-white"
                        : office.specialtag === "New Listing"
                        ? "bg-gradient-to-r from-[#5dc062] via-[#196e259f] to-[#093621] text-white"
                        : "bg-gradient-to-r from-[#794d75] via-[#a8a75f] to-[#7d7e4e] text-white" // default
                    }
                    
                  `}
            >
              {office.specialtag == "New Listing"
                ? "🌟 New Listing"
                : office.specialtag}
            </span>
          </div>
        )}

        {/* 🏢 Office Image */}
        <img
          src={office.images?.[0] || "/placeholder-office.jpg"}
          alt={office.name}
          className="w-full h-32 object-cover rounded-t-xl  transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/placeholder-office.jpg";
          }}
        />

        {/* 🏷️ Office Type Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
              office.type === "Virtual Office"
                ? "bg-[#13B3A5]"
                : office.type === "Coworking Space"
                ? "bg-blue-600"
                : office.type === "Virtual and Coworking"
                ? "bg-purple-600"
                : "bg-gray-400"
            }`}
          >
            {office.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        {/* Title and Location */}
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 text-sm">
          {office.name}
        </h3>

        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="w-3 h-3 text-red-400 mr-1 flex-shrink-0" />
          <span className="text-xs truncate">{office.location.city}</span>
          <div className="absolute top-2 left-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                office.type === "Virtual Office"
                  ? "bg-[#13B3A5]"
                  : office.type === "Coworking Space"
                  ? "bg-blue-600"
                  : office.type === "Virtual and Coworking"
                  ? "bg-purple-600"
                  : "bg-gray-400"
              }`}
            >
              {office.type}
            </span>
          </div>
        </div>

        {/* Two-line Description */}
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
          {generateDescription(office)}
        </p>

        {/* Key Amenities */}
        {office.features && office.features.length > 0 && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              {office.features.slice(0, 3).map((feature, index) => {
                const IconComponent = getFeatureIcon(feature);
                return (
                  <div
                    key={index}
                    className="p-1 bg-blue-50 rounded-lg tooltip"
                    title={feature}
                  >
                    <IconComponent className="w-3 h-3 text-blue-600" />
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-blue-600 font-medium">
              {office.features.length} amenities
            </div>
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="space-y-1">
            {/* Virtual Office Pricing */}
            {office.type === "Virtual Office" && (
              <div>
                {office.pricing?.discount > 0 ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">
                        ₹
                        {Math.round(
                          office.pricing.yearly -
                            (office.pricing.yearly * office.pricing.discount) /
                              100
                        ).toLocaleString()}
                        /Year
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        🎉 {office.pricing.discount}% OFF
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-semibold line-through">
                      ₹{office.pricing?.yearly?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                ) : (
                  <div className="text-lg font-bold text-blue-600">
                    ₹{office.pricing?.yearly?.toLocaleString() || "N/A"}/Year
                  </div>
                )}
              </div>
            )}

            {/* Coworking Pricing */}
            {office.type === "Coworking Space" && (
              <div>
                {office.pricing?.discount > 0 ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">
                        ₹
                        {Math.round(
                          office.pricing.monthly -
                            (office.pricing.monthly * office.pricing.discount) /
                              100
                        ).toLocaleString()}
                        /Month
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        💥 {office.pricing.discount}% OFF
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{office.pricing?.monthly?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                ) : (
                  <div className="text-lg font-bold text-blue-600">
                    ₹{office.pricing?.monthly?.toLocaleString() || "N/A"}/Month
                  </div>
                )}
              </div>
            )}

            {/* Combined Pricing */}
            {office.type === "Virtual and Coworking" && (
              <div className="flex flex-col leading-tight">
                <span className="text-blue-600 font-bold text-base">
                  Virtual: ₹
                  {office.pricing?.yearly
                    ? Math.round(
                        office.pricing.yearly -
                          (office.pricing.yearly *
                            (office.pricing.discount || 0)) /
                            100
                      ).toLocaleString()
                    : "N/A"}
                  /Year
                </span>
                <span className="text-blue-500 font-semibold text-sm">
                  Coworking: ₹
                  {office.pricing?.monthly
                    ? Math.round(
                        office.pricing.monthly -
                          (office.pricing.monthly *
                            (office.pricing.discount || 0)) /
                            100
                      ).toLocaleString()
                    : "N/A"}
                  /Month
                </span>
              </div>
            )}
          </div>

          <Link
            to={`/office/${office.slug}`}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-xs group/btn"
          >
            Explore
            <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;
