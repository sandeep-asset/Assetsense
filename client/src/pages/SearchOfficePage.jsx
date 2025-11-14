import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaUsers,
  FaStar,
  FaWifi,
  FaCoffee,
  FaCar,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import PopupLeadForm from "../components/CityGurgaon/LeadForm";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SearchOfficePage = () => {
  const [filters, setFilters] = useState({
    officeTypes: [],
    cities: [],
    priceRange: { min: 0, max: 0 },
  });
  const [selectedFilters, setSelectedFilters] = useState({
    type: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const predefinedPriceRanges = [
    { label: "All Prices", min: "", max: "" },
    { label: "₹0 - ₹10,000", min: 0, max: 9999 },
    { label: "₹10,000 - ₹15000", min: 10000, max: 14999 },
    { label: "₹15,000 - ₹20000", min: 15000, max: 19999 },
    { label: "₹20000+", min: 20000, max: "" },
  ];

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [offices, setOffices] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  // fetch filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/offices/filters`);
        if (data.success) setFilters(data.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const fetchOffices = async (
    searchText = "",
    filtersToUse = selectedFilters
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        query: searchText,
        type: filtersToUse.type,
        city: filtersToUse.city,
        minPrice: filtersToUse.minPrice,
        maxPrice: filtersToUse.maxPrice,
      }).toString();

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

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeFromUrl = params.get("type");
    const cityFromUrl = params.get("city");
    const minPriceFromUrl = params.get("minPrice");
    const maxPriceFromUrl = params.get("maxPrice");

    const updatedFilters = {
      type: typeFromUrl ? decodeURIComponent(typeFromUrl) : "",
      city: cityFromUrl ? decodeURIComponent(cityFromUrl) : "",
      minPrice: minPriceFromUrl || "",
      maxPrice: maxPriceFromUrl || "",
    };

    setSelectedFilters(updatedFilters);
    fetchOffices("", updatedFilters);
  }, [location.search]);

  // useEffect(() => {
  //   fetchOffices();
  // }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOffices(query);
  };

  // Do not disturbed or delete this API call - important for featured offices
  const featuredOffices = offices
    .filter((office) => office.featured)
    .slice(0, 3);
  const allOffices = offices.filter((office) => !office.featured);

  const getFeatureIcon = (feature) => {
    const featureIcons = {
      wifi: FaWifi,
      coffee: FaCoffee,
      parking: FaCar,
      security: FaShieldAlt,
      "meeting rooms": FaUsers,
      "24/7 access": FaClock,
    };
    return featureIcons[feature.toLowerCase()] || FaStar;
  };

  const handleResetFilters = () => {
    const clearedFilters = {
      type: "",
      city: "",
      minPrice: "",
      maxPrice: "",
    };

    setSelectedFilters(clearedFilters);
    setQuery(""); // reset search input also

    // 👇 automatically fetch all offices again
    fetchOffices("", clearedFilters);
  };

  ///Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // calculate paginated slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffices = allOffices.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allOffices.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
              <FaCheckCircle className="text-green-300" />
              <span className="text-sm font-medium text-white">
                Trusted by 500+ companies
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Find Your{" "}
              <span className="bg-[#17CFBF] bg-clip-text text-transparent">
                Perfect Workspace
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Premium offices, coworking spaces & virtual offices tailored for
              productivity and growth
            </p>

            {/* Compact Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-2xl">
                <div className="flex-1 flex items-center">
                  <FaSearch className="text-blue-200 ml-3 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by city, office type, or features..."
                    className="flex-1 py-3 text-white placeholder-blue-200 focus:outline-none text-base bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Find Spaces
                </button>
              </div>
            </form>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                { value: `${offices.length}+`, label: "Multiple Spaces" },
                { value: "50+", label: "Multiple Cities" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-blue-200 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* filters */}
      {/* Filter Bar */}
      <div className="bg-transparent  border border-white/10 p-3 sm:p-4 rounded-xl shadow-md mb-6 text-gray-800">
        {/* Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
          {/* Office Type */}
          <select
            value={selectedFilters.type}
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, type: e.target.value })
            }
            className="w-full bg-transparent border border-gray-400 text-gray-800 text-sm p-2 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition-all"
          >
            <option value="">All Types</option>
            {filters.officeTypes.map((t) => (
              <option key={t} value={t} className="text-black">
                {t}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            value={selectedFilters.city}
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, city: e.target.value })
            }
            className="w-full bg-transparent border border-gray-400 text-gray-800 text-sm p-2 rounded-lg focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition-all"
          >
            <option value="">All Cities</option>
            {filters.cities.map((c) => (
              <option key={c} value={c} className="text-black">
                {c}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <select
            value={
              predefinedPriceRanges.find(
                (range) =>
                  range.min == selectedFilters.minPrice &&
                  range.max == selectedFilters.maxPrice
              )?.label || ""
            }
            onChange={(e) => {
              const range = predefinedPriceRanges.find(
                (r) => r.label === e.target.value
              );
              if (range) {
                setSelectedFilters({
                  ...selectedFilters,
                  minPrice: range.min,
                  maxPrice: range.max,
                });
              }
            }}
            className="w-full bg-transparent border border-gray-400 text-gray-800 text-sm p-2 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-300 transition-all col-span-2 sm:col-span-1"
          >
            {predefinedPriceRanges.map((range) => (
              <option
                key={range.label}
                value={range.label}
                className="text-black"
              >
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons Row */}
        <div className="flex justify-center items-center gap-4 mt-3">
          <button
            onClick={() => fetchOffices(query, selectedFilters)}
            className="bg-blue-500/90 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 shadow-md"
          >
            <span>Apply Filters</span>
          </button>

          <button
            onClick={handleResetFilters}
            className="bg-transparent hover:bg-white/20 border border-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 shadow-md"
          >
            <span>Reset Filter</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Office Listings Section */}
          <div className="lg:w-2/3 w-full">
            {/* All Offices - Single Row Layout */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <FaSearch className="text-white text-sm" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    All Spaces {offices.length > 0 && `(${offices.length})`}
                  </h2>
                </div>
                <div className="text-sm text-gray-500">
                  Sorted by: <span className="font-semibold">Best Match</span>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : offices.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="text-5xl mb-4">🏢</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No Spaces Found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Try adjusting your search terms or explore all available
                    workspaces.
                  </p>
                  <button
                    onClick={() => {
                      setQuery("");
                      fetchOffices();
                    }}
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm"
                  >
                    Show All Spaces
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentOffices.map((office) => (
                    <div
                      key={office._id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-visible group"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Office Image */}
                        <div className="sm:w-1/4 relative">
                          {/* Office Image */}
                          <img
                            src={
                              office.images?.[0] || "/placeholder-office.jpg"
                            }
                            alt={office.name}
                            className="w-full md:h-full h-48 sm:h-32 object-cover transition-transform duration-300 rounded-lg"
                          />

                          {/* LEFT — Office Type Badge */}
                          <span
                            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold shadow-md 
                              ${
                                office.type === "Virtual Office"
                                  ? "bg-[#13B3A5] text-white"
                                  : office.type === "Coworking Space"
                                  ? "bg-blue-600 text-white"
                                  : office.type === "Virtual and Coworking"
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-500 text-white"
                              }
                            `}
                          >
                            {office.type}
                          </span>

                          {/* RIGHT — Special Tag Badge (half inside, half outside) */}
                          {office.specialtag && (
                            <span
                              className={`absolute top-1 right-3 px-3 py-1  rounded text-xs font-bold shadow-lg border border-white/40
                                ${
                                  office.specialtag === "Popular"
                                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                                    : office.specialtag === "Affordable"
                                    ? "bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-white"
                                    : office.specialtag === "Best Value"
                                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white"
                                    : "bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-500 text-white"
                                }
                              `}
                              style={{ transform: "translateY(-50%)" }} // makes it half outside
                            >
                              {office.specialtag == "New Listing"
                                ? "🌟 New Listing"
                                : office.specialtag}
                            </span>
                          )}
                        </div>

                        {/* Office Details */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col h-full">
                            {/* Top Row - Title, Location, Price */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                              {/* Left Section: Name + Location */}
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                                  {office.name}
                                </h3>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-gray-600 text-sm">
                                  <div className="flex items-center gap-1 sm:flex-shrink-0">
                                    <FaMapMarkerAlt className="text-red-400" />
                                    <span className="truncate">
                                      {office.location.city},{" "}
                                      {office.location.address}
                                    </span>
                                  </div>

                                  {/* Price on mobile in the same row */}
                                  {/* <div className="flex items-center justify-between sm:justify-start sm:ml-auto mt-1 sm:mt-0">
                                    <div className="text-blue-600 font-bold text-base sm:text-xl">
                                      ₹
                                      {office.pricing?.monthly?.toLocaleString()}
                                      /year
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>

                            {/* Middle Row - Description & Features */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                              <div className="flex-1">
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                  {office.description ||
                                    "Professional workspace designed for modern businesses with all essential amenities."}
                                </p>

                                {/* Features */}
                                {office.features &&
                                  office.features.length > 0 && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                      {office.features
                                        .slice(0, 3)
                                        .map((feature, index) => {
                                          const IconComponent =
                                            getFeatureIcon(feature);
                                          return (
                                            <div
                                              key={index}
                                              className="flex items-center bg-gray-50 px-2 py-1 rounded-lg"
                                            >
                                              <IconComponent className="w-3 h-3 text-blue-500 mr-1" />
                                              <span className="text-xs text-gray-600">
                                                {feature}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      {office.features.length > 3 && (
                                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                          +{office.features.length - 3} more
                                        </div>
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>

                            {/* Bottom Row - Capacity & Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-sm text-gray-700">
                                {/* Capacity */}
                                {office.capacity && (
                                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                                    <FaUsers className="mr-2 h-5 w-5 text-gray-600" />
                                    <span className="font-medium">
                                      {office.capacity} Seat
                                    </span>
                                  </div>
                                )}

                                {/* Pricing — dynamically rendered based on type */}
                                {office.type === "Virtual Office" &&
                                  office.pricing?.yearly && (
                                    <div className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors font-semibold text-sm">
                                      ₹{office.pricing.yearly.toLocaleString()}
                                      /year
                                    </div>
                                  )}

                                {office.type === "Coworking Space" &&
                                  office.pricing?.monthly && (
                                    <div className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                                      ₹{office.pricing.monthly.toLocaleString()}
                                      /month
                                    </div>
                                  )}

                                {office.type === "Virtual and Coworking" && (
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm">
                                    <span>
                                      Virtual: ₹
                                      {office.pricing?.yearly?.toLocaleString() ||
                                        "N/A"}
                                      /year
                                    </span>
                                    <span>
                                      Coworking: ₹
                                      {office.pricing?.monthly?.toLocaleString() ||
                                        "N/A"}
                                      /month
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex justify-between items-center w-full gap-2">
                                <a
                                  href={`/office/${office.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
                                >
                                  View Details
                                  <FaArrowRight className="text-xs" />
                                </a>

                                <button
                                  onClick={() => setIsFormOpen(true)}
                                  className="flex cursor-pointer items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm"
                                >
                                  Contact Now
                                </button>

                                <PopupLeadForm
                                  isOpen={isFormOpen}
                                  onClose={() => setIsFormOpen(false)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === idx + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Contact Form Section */}
          <div className="lg:w-1/3 w-full lg:sticky lg:top-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                <h3 className="text-lg font-bold mb-1">
                  {selectedOffice
                    ? `Contact ${selectedOffice.name}`
                    : "Get Expert Help"}
                </h3>
                <p className="text-blue-100 text-sm">
                  {selectedOffice
                    ? "Schedule a visit & get pricing"
                    : "Find your ideal workspace today"}
                </p>
              </div>
              <div className="p-4">
                <ContactForm
                  office={selectedOffice}
                  key={selectedOffice?._id || "general"}
                />
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mt-4 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Why Choose Us?
              </h4>
              <div className="space-y-3">
                {[
                  {
                    icon: "🔒",
                    title: "Verified Spaces",
                    desc: "Personally inspected",
                  },
                  {
                    icon: "💰",
                    title: "Best Prices",
                    desc: "Guaranteed competitive",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Booking",
                    desc: "Immediate confirmation",
                  },
                  {
                    icon: "🎯",
                    title: "Prime Locations",
                    desc: "Best business areas",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOfficePage;
