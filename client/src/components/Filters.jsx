import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaSyncAlt,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const predefinedPriceRanges = {
  "Coworking Space": [
    { label: "All Prices Per Month", min: 0, max: " " },
    { label: "0 – ₹10000", min: 0, max: 10000 },
    { label: "₹10000 – ₹14999", min: 10000, max: 14999 },
    { label: "₹15000 – ₹19999", min: 15000, max: 19999 },
    { label: "₹20000+", min: 20000, max: Infinity },
  ],

  "Virtual Office": [
    { label: "Prices Per month", min: 0, max: Infinity },
    { label: "₹0 – ₹1000", min: 0, max: 999 },
    { label: "₹1000 – ₹1500", min: 1000, max: 1499 },
    { label: "₹1500 – ₹2000", min: 1500, max: 1999 },
    { label: "₹2000+ ", min: 2000, max: Infinity },
  ],

  "Virtual and Coworking": [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "₹5k – ₹15K /yr", min: 5000, max: 14999 },
    { label: "₹15K – ₹25K /yr", min: 15000, max: 24999 },
    { label: "₹25K – ₹40K /yr", min: 25000, max: 39999 },
    { label: "₹40K+ /yr", min: 40000, max: Infinity },
  ],
};

const OfficeFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });
  const [tempFilters, setTempFilters] = useState({
    type: "",
    city: "",
    priceRange: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    officeTypes: [],
  });

  const [isSticky, setIsSticky] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cityQuery, setCityQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [dynamicPriceRanges, setDynamicPriceRanges] = useState(
    predefinedPriceRanges["Coworking Space"]
  );

  // const predefinedPriceRanges = [
  //   { label: "Price Per Month", min: "", max: "" },
  //   { label: "₹0 - ₹10,00", min: 0, max: 9999 },
  //   { label: "₹10,00 - ₹5,000", min: 10000, max: 14999 },
  //   { label: "₹15,000 - ₹20,000", min: 15000, max: 19999 },
  //   { label: "₹20,000+", min: 20000, max: "" },
  // ];

  // ✅ Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/offices/filters`);
        if (res.data.success) {
          setFilterOptions(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (tempFilters.type) {
      // Pick price range by selected office type
      setDynamicPriceRanges(predefinedPriceRanges[tempFilters.type]);
    } else {
      // Default: show coworking ranges
      setDynamicPriceRanges(predefinedPriceRanges["Coworking Space"]);
    }
  }, [tempFilters.type]);

  // ✅ Sticky + scroll direction collapse
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (window.innerWidth < 768) {
        setIsSticky(currentY > 200);
        if (currentY > lastScrollY + 10) {
          // Scrolling down → collapse
          setIsCollapsed(true);
        } else if (currentY < lastScrollY - 10) {
          // Scrolling up → expand
          setIsCollapsed(false);
        }
      } else {
        setIsSticky(false);
        setIsCollapsed(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleApply = () => {
    const selectedRange = dynamicPriceRanges.find(
      (r) => r.label === tempFilters.priceRange
    );

    const minPrice = selectedRange ? selectedRange.min : "";
    const maxPrice = selectedRange ? selectedRange.max : "";

    const newFilters = {
      type: tempFilters.type,
      city: tempFilters.city,
      minPrice,
      maxPrice,
    };

    setFilters(newFilters);

    if (onFilterChange) onFilterChange(newFilters);

    // ✅ Create dynamic toast message
    const priceLabel =
      selectedRange && selectedRange.label !== "All Prices"
        ? ` (${selectedRange.label} range)`
        : "";

    const cityLabel = tempFilters.city ? ` in ${tempFilters.city}` : "";

    toast.success(
      `Filters applied${cityLabel}${priceLabel ? priceLabel : ""}!`,
      { duration: 3000 }
    );
  };
  // ✅ Dynamically determine price range based on office type

  const handleReset = () => {
    const cleared = { type: "", city: "", minPrice: "", maxPrice: "" };
    const clearedTemp = { type: "", city: "", priceRange: "" };

    setFilters(cleared);
    setTempFilters(clearedTemp);
    if (onFilterChange) onFilterChange(cleared);
    setCityQuery("");
    setTypeQuery("");

    toast.success("Filters reset — showing all offices.", {
      duration: 2500,
    });
  };

  return (
    <div
      className={`transition-all duration-500 ${
        isSticky
          ? "fixed top-20 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 shadow-lg"
          : "bg-transparent"
      } md:relative md:backdrop-blur-0 md:shadow-none md:bg-transparent text-white rounded-xl`}
    >
      {/* --- Collapsed Floating Filter Button (Mobile Only) --- */}
      {isSticky && isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="mx-auto block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md flex items-center justify-center gap-2 mt-1 mb-2 transition-all duration-300"
        >
          <FaFilter className="text-sm" /> Filters
        </button>
      ) : (
        <div className="p-3">
          {/* --- Close Button (Mobile Only) --- */}
          {isSticky && (
            <div className="flex justify-end -mt-2 mb-2 md:hidden">
              <button
                onClick={() => setIsCollapsed(true)}
                className="text-gray-300 hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* === Row 1: Type, City, Price === */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full">
            {/* Type */}
            <div className="flex-1 min-w-[90px] relative">
              <label className="sm:block text-[11px] font-semibold text-gray-100 mb-1 flex gap-1">
                <FaBuilding className="text-blue-400 text-[10px]" />
                Office Type
              </label>

              <input
                type="text"
                placeholder="Type or Select office..."
                value={typeQuery}
                onChange={(e) => {
                  setTypeQuery(e.target.value);
                  setShowTypeDropdown(true);
                }}
                onFocus={() => setShowTypeDropdown(true)}
                className="w-full p-2 bg-white/20 border border-white/30 cursor-pointer rounded-md text-[11px] sm:text-xs text-white placeholder-gray-300"
              />

              {showTypeDropdown && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-40 overflow-auto">
                  {filterOptions.officeTypes
                    .filter((type) =>
                      type.toLowerCase().includes(typeQuery.toLowerCase())
                    )
                    .map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setTempFilters((prev) => ({ ...prev, type }));
                          setTypeQuery(type);
                          setShowTypeDropdown(false);
                        }}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100 text-gray-800"
                      >
                        {type}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* City */}
            <div className="flex-1 min-w-[90px] relative">
              <label className="sm:block text-[11px] font-semibold text-gray-100 mb-1 flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-400 text-[10px]" /> City
              </label>

              <input
                type="text"
                placeholder="Type or Select city..."
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setShowCityDropdown(true);
                }}
                onFocus={() => setShowCityDropdown(true)}
                className="w-full p-2 bg-white/20 border border-white/30 cursor-pointer rounded-md text-[11px] sm:text-xs text-white placeholder-gray-300"
              />

              {showCityDropdown && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-40 overflow-auto">
                  {filterOptions.cities
                    .filter((city) =>
                      city.toLowerCase().includes(cityQuery.toLowerCase())
                    )
                    .map((city) => (
                      <div
                        key={city}
                        onClick={() => {
                          setTempFilters((prev) => ({ ...prev, city }));
                          setCityQuery(city);
                          setShowCityDropdown(false);
                        }}
                        className="px-3 py-2 text-sm justify-start cursor-pointer hover:bg-green-100 text-gray-800"
                      >
                        {city}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex-1 min-w-[90px]">
              <label className="sm:block text-[11px] font-semibold text-gray-100 mb-1 flex items-center gap-1">
                <FaRupeeSign className="text-green-400 text-[10px]" /> Price
                range
              </label>
              <select
                value={tempFilters.priceRange}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    priceRange: e.target.value,
                  }))
                }
                className="w-full p-2 bg-white/20 border border-white/30 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-300 text-[11px] sm:text-xs text-white"
              >
                {dynamicPriceRanges.map((range) => (
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
          </div>

          {/* === Row 2: Buttons === */}
          <div className="flex justify-center gap-3 mt-3 flex-wrap">
            <button
              onClick={handleApply}
              className="bg-green-500/80 hover:bg-green-600 text-white py-1.5 px-5 rounded-md text-[11px] sm:text-xs font-semibold shadow-sm"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="bg-white/20 hover:bg-white/30 border border-white/20 text-gray-100 py-1.5 px-5 rounded-md text-[11px] sm:text-xs font-semibold flex items-center gap-1"
            >
              <FaSyncAlt className="text-[10px]" /> Reset
            </button>
          </div>

          {/* === Row 3: Active Filters === */}
          {(filters.type ||
            filters.city ||
            filters.minPrice ||
            filters.maxPrice) && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-gray-200 text-[10px] sm:text-xs">
              <span className="opacity-70">Active:</span>
              {filters.type && (
                <span className="bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <FaBuilding /> {filters.type}
                </span>
              )}
              {filters.city && (
                <span className="bg-green-500/20 text-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <FaMapMarkerAlt /> {filters.city}
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <FaRupeeSign />
                  {filters.minPrice ? `₹${filters.minPrice}` : "₹0"} -{" "}
                  {filters.maxPrice ? `₹${filters.maxPrice}` : "Above"}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OfficeFilters;
