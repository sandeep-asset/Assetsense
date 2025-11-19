import React, { useState, useEffect } from "react";
import axios from "axios";

import OfficeCard from "../components/OfficeCard";
import OfficeListingCTA from "../components/OfficeListingCTA";
import { useNavigate, useLocation, Link } from "react-router-dom";
import FeaturesGrid from "../components/FeaturesGrid";

import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaBuilding,
  FaSyncAlt,
  FaUsers,
  FaStar,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaChartLine,
  FaCity,
} from "react-icons/fa";

import PopupLeadForm from "../components/CityGurgaon/LeadForm";
import OfficeFilters from "../components/Filters";
import useScrollRestore from "../components/useScrollRestore";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  useScrollRestore();
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // 👈 track route

  //Fetch OFfice after filter
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    city: "",
  });

  // ✅ Debounce fetch to prevent refetch on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOffices();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters]);

  // Statistics Data
  const statsData = [
    {
      icon: FaBuilding,
      value: "500+",
      label: "Premium Spaces",
      description: "Curated workspaces",
    },
    {
      icon: FaCity,
      value: "50+",
      label: "Cities Covered",
      description: "Across India",
    },
    {
      icon: FaUsers,
      value: "10K+",
      label: "Happy Clients",
      description: "Growing businesses",
    },
    {
      icon: FaStar,
      value: "4.9/5",
      label: "Customer Rating",
      description: "Rated by users",
    },
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="relative h-screen md:pb-25 pb-40 md:pt-10 pt-40 min-h-[550px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* style={{
            backgroundImage: `url('/heroImage.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} */}

          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-blue-900/30 to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 pb-2 mb-8 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-2 text-xs animate-fade-in">
            <FaStar className="h-3 w-3 text-yellow-400" />
            Trusted by 500+ Companies
          </div>
          <div className="flex flex-wrap justify-center p-1 pt-2 mb-2 items-center gap-2 text-xs text-gray-300">
            <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                className="text-yellow-500 text-xs"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-xs">4.9/5</span>
            </div>
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-1 py-1 rounded-full">
              <span className="text-xs">GST/MCA Approved</span>
            </div>
            <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-1 py-1 rounded-full">
              <span className="text-xs">1500+ Clients</span>
            </div>
          </div>
          {/* Headline */}
          <h1 className="text-3xl sm:text-xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
            Pan-India <span className="text-blue-600">Coworking</span> &{" "}
            <span className="text-[#17CFBF]">Virtual Office</span>
            <br />
            Affordable Solutions in 50+ Locations
          </h1>

          {/* Subtitle of home sections */}
          <p className="md:text-lg text-sm text-white mb-5 max-w-3xl mx-auto animate-fade-in-up">
            Get GST, MCA, Shop & Establishment, RERA, FSSAI, and similar
            business registrations—available across all major Indian cities.
          </p>

          {/* Filters Row */}

          <OfficeFilters onFilterChange={fetchOffices} />

          <PopupLeadForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />

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
        {/* our client */}
      </header>
      {/* our client Starts */}
      <div className="mt-6 text-center">
        <p className="text-2xl text-gray-700 mb-6">
          Trusted by leading Indian brands
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent z-10" />
          <div className="flex animate-scroll-x hover:[animation-play-state:paused] gap-12 items-center opacity-80">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center shrink-0">
                <img
                  src="/logos/Alcravo.png"
                  alt="Alcravo"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/Andhrola.png"
                  alt="Andhrola"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/hindustanGold.png"
                  alt="HindustanGold"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/pajson.png"
                  alt="Pajson"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/dreamlingerie.png"
                  alt="Dream Lingerie"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/mads.png"
                  alt="Mad Sign"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/saurabh.png"
                  alt="Saurabh Eng"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/abhiyantri.png"
                  alt="Abhiyantri"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/halejo.png"
                  alt="Halejo"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src="/logos/codegyan.png"
                  alt="Halejo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* our client end */}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 pt-10 to-blue-50">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Hero Section with Stats */}

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Statistics Grid */}

            {/* Results Header */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between mb-6"
              id="availableWorkspaces"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Workspaces
                </h2>
                <p className="text-gray-600 mt-1">
                  {loading ? "Searching..." : `Found ${offices.length} spaces`}
                </p>
              </div>

              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Loading spaces...
                </div>
              )}
            </div>

            {/* Office Grid - Smaller Cards */}

            {offices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
                {offices.slice(0, 8).map((office) => (
                  <div
                    key={office._id}
                    className="transform hover:scale-[1.02] transition-transform duration-300"
                  >
                    <Link key={office._id} to={`/office/${office.slug}`}>
                      <OfficeCard office={office} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200 mb-12">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-3xl text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Spaces Found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or explore different cities to find
                  your perfect workspace.
                </p>
                <button
                  onClick={() => setFilters({ type: "", city: "" })}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
                >
                  Show All Spaces
                </button>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <Link
                to="/search"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md"
              >
                View All Workspaces
              </Link>
            </div>

            <OfficeListingCTA />
            {/* Additional Stats Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  Why Choose Asset Sense Workspaces?
                </h3>
                <p className="text-blue-100">
                  We're committed to providing the best workspace solutions
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <FaClock className="text-4xl text-yellow-300 mx-auto mb-3" />
                  <div className="text-xl font-bold">24/7 Support</div>
                  <div className="text-blue-100 text-sm">
                    On-site staff plus 24/7 digital support, so you're never
                    without help.
                  </div>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-4xl text-green-300 mx-auto mb-3" />
                  <div className="text-xl font-bold">Secure Spaces</div>
                  <div className="text-blue-100 text-sm">
                    Your peace of mind is our priority, with 24/7 CCTV
                    surveillance and secure key-card access.
                  </div>
                </div>
                <div className="text-center">
                  <FaChartLine className="text-4xl text-red-300 mx-auto mb-3" />
                  <div className="text-xl font-bold">Growth Ready</div>
                  <div className="text-blue-100 text-sm">
                    Start with a single desk and scale to a private office
                    anytime. We grow with you.
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Icon className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">
                          {stat.value}
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                          {stat.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stat.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
