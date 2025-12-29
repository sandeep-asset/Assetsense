import { useState, useEffect, useRef } from "react";
import {
  FaCamera,
  FaTimes,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Gallery = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const fetchLatestOffices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/offices/searchfilter?limit=12&sort=latest`
      );
      if (data.success) setOffices(data.data);
    } catch (error) {
      console.error("Error fetching gallery offices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestOffices();
  }, []);

  const closeModal = () => setSelectedImage(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        id="gallery"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#6aebe2] text-black border border-[#94fff8] text-sm font-medium mb-4">
              <FaCamera className="h-3 w-3 mr-1" />
              Gallery
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Explore Our Latest Offices
            </h2>
            <p className="text-gray-600">
              Swipe, drag or use the arrows to scroll
            </p>
          </div>

          {/* Horizontal scroller (manual with arrows) */}
          {loading ? (
            <p className="text-center text-gray-500">
              Loading latest offices...
            </p>
          ) : offices.length > 0 ? (
            <div className="relative">
              {/* Left scroll button */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md backdrop-blur-sm sm:flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FaChevronLeft className="text-xl" />
              </button>

              {/* Right scroll button */}
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md backdrop-blur-sm  sm:flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FaChevronRight className="text-xl" />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-2 scrollbar-hide touch-pan-x"
                tabIndex={0}
                role="list"
                aria-label="Office gallery"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {offices.map((office, index) => (
                  <div
                    key={office._id || index}
                    role="listitem"
                    className="min-w-[250px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-xl transition-all snap-center group"
                  >
                    {/* Image (opens modal) */}
                    <div
                      className="relative cursor-pointer"
                      onClick={() => setSelectedImage(office)}
                    >
                      {/* <img
                        src={office.images?.[0] || "/placeholder.jpg"}
                        alt={office.name || "Office image"}
                        className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-lg"
                      /> */}
                      <img
                        src={
                          office.images?.[0]
                            ? office.images[0].replace(
                                "/upload/",
                                "/upload/f_auto,q_auto:eco,w_400,h_280,c_fill,g_auto/"
                              )
                            : "/placeholder.jpg"
                        }
                        alt={office.name || "Office image"}
                        className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-lg"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-md text-white text-xs font-medium mb-2
              ${
                office.type === "Coworking Space"
                  ? "bg-blue-600/90"
                  : office.type === "Virtual Office"
                  ? "bg-[#17CFBF]"
                  : office.type === "Virtual and Coworking"
                  ? "bg-[#9810FA]"
                  : "bg-gray-600/90"
              }`}
                          >
                            {office.type || "Office"}
                          </div>

                          {office.location && (
                            <div className="flex items-center text-white text-sm">
                              <FaMapMarkerAlt className="w-4 h-4 text-red-400 mr-2" />
                              <span className="truncate">
                                {office.location.city},{" "}
                                {office.location.address}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaCamera className="h-8 w-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* View Details button */}
                    <div className="p-3 text-center bg-gray-50 border-t">
                      <Link
                        to={`/office/${office.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block px-4 py-2 rounded-md bg-[#6aebe2] text-gray-900 font-semibold text-sm hover:bg-[#5cd6ce] transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No offices available right now.
            </p>
          )}
        </div>
      </section>

      {/* Full-width image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-55 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-200 hover:scale-110"
            >
              <FaTimes className="h-4 w-4" />
            </button>

            <img
              src={selectedImage.images?.[0] || "/placeholder.jpg"}
              alt={selectedImage.name}
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
