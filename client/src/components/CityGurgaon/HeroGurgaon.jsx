import { FaStar, FaBuilding, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import OfficeFilters from "../Filters";

const HeroGurgaon = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    city: "",
  });

  const fetchOffices = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(
        `${backendUrl}/api/offices/searchfilter?${params}`
      );
      if (data.success) setOffices(data.data);
    } catch (error) {
      console.error("Error fetching offices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOffices();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters]);
  return (
    <header className="relative h-screen md:pb-25 pb-65 md:pt-10 pt-65 min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/hero-workspace.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Multi-layer Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-blue-900/30 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-2 text-xs animate-fade-in">
          <FaStar className="h-3 w-3 text-yellow-400" />
          Trusted by 500+ Companies
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
          Pan-India <span className="text-blue-600">Coworking</span> &{" "}
          <span className="text-[#17CFBF]">Virtual Office</span>
          <br />
          Affordable Solutions in 50+ Locations
        </h1>

        {/* Subtitle */}
        <p className="md:text-lg text-sm text-white mb-5 max-w-3xl mx-auto animate-fade-in-up">
          Get GST, MCA, Shop & Establishment, RERA, FSSAI, and similar business
          registrations—available across all major Indian cities.
        </p>

        {/* Filters Row */}
        <OfficeFilters onFilterChange={fetchOffices} />

        {/* Feature Highlights */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white animate-fade-in-up">
          {[
            "50+ Locations",
            "No Hidden Charges",
            "Instant Setup",
            "Free Consultation",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <FaCheckCircle className="h-5 w-5 text-[#17CFBF]" />
              <span className="text-xs">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeroGurgaon;
