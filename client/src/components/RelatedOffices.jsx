import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RelatedOffices = ({ officeSlug, city }) => {
  const [relatedOffices, setRelatedOffices] = useState([]);

  useEffect(() => {
    const fetchRelatedOffices = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/offices/${officeSlug}/related`
        );
        if (res.data.success) {
          setRelatedOffices(res.data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching related offices:", error);
      }
    };
    if (officeSlug) fetchRelatedOffices();
  }, [officeSlug]);

  if (!relatedOffices.length) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
        Related Offices in {city}
      </h2>

      {/* Horizontal Scrollable Cards */}
      <div
        className={`
    flex gap-6 
    overflow-x-auto 
    scrollbar-hide 
    scroll-smooth 
    pb-4 
    snap-x 
    snap-mandatory
   
    

  `}
      >
        {relatedOffices.map((related) => {
          const isVirtual = related.type?.toLowerCase().includes("virtual");
          const price = isVirtual
            ? related?.pricing?.yearly
            : related?.pricing?.monthly || "N/A";

          return (
            <Link
              key={related._id}
              to={`/office/${related.slug}`}
              className="
                flex-shrink-0 
                snap-start
                bg-white 
                rounded-xl 
                shadow-md 
                border 
                hover:shadow-xl 
                hover:-translate-y-1 
                transition-all 
                duration-300 
                overflow-hidden 
                group
                w-[75%] sm:w-[45%] lg:w-[28%]
                max-w-xs
              "
            >
              {/* Image */}
              <div className="relative h-36 w-full overflow-hidden">
                <span
                  className={`absolute top-2 left-2   text-xs px-2 py-1 rounded-md shadow-md z-10 ${
                    related.type === "Virtual Office"
                      ? "bg-[#13B3A5]"
                      : related.type === "Coworking Space"
                      ? "bg-blue-600"
                      : related.type === "Virtual and Coworking"
                      ? "bg-purple-600"
                      : "bg-gray-400"
                  }`}
                >
                  {related.type}
                </span>
                <img
                  src={related.images?.[0] || "/placeholder-office.jpg"}
                  alt={related.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.target.src = "/placeholder-office.jpg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {related.name}
                </h3>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                  {related.location?.address || ""}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  {/* PRICE + DISCOUNT LOGIC */}
                  <div>
                    {related?.pricing?.discount ? (
                      (() => {
                        const regularPrice = Number(price);
                        const discountPercent = Number(
                          related.pricing.discount
                        );

                        const discountedPrice = Math.round(
                          regularPrice - (regularPrice * discountPercent) / 100
                        );

                        return (
                          <>
                            {/* Discounted Price */}
                            <p className="text-green-600 font-bold text-sm">
                              ₹{discountedPrice}
                              <span className="text-green-600 text-xs">
                                /{isVirtual ? "year" : "month"}
                              </span>
                            </p>

                            {/* Regular Price Strikethrough */}
                            <p className="text-gray-500 text-xs line-through">
                              ₹{regularPrice}
                            </p>

                            {/* Discount Percentage */}
                            <p className="text-red-500 text-xs font-semibold">
                              {discountPercent}% OFF
                            </p>
                          </>
                        );
                      })()
                    ) : (
                      // No discount → Show normal price
                      <p className="text-blue-600 font-bold text-sm">
                        ₹{price}
                        <span className="text-blue-600 text-xs">
                          /{isVirtual ? "year" : "month"}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* View Details Button */}
                  <span
                    className="
      bg-gradient-to-r from-blue-600 to-blue-500 
      text-white px-3 py-1 
      text-xs rounded-md 
      shadow-md 
      group-hover:from-blue-700 
      group-hover:to-blue-600 
      transition-all duration-300
    "
                  >
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedOffices;
