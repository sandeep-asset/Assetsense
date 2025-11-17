import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModernComparisonSection from "../components/comperison";
import RelatedOffices from "../components/RelatedOffices";
import PopupLeadForm from "../components/CityGurgaon/LeadForm";
import FaqGurgaon from "../components/CityGurgaon/FaqGurgaon";
import Testimonials from "../components/CityGurgaon/TestimonialsGurgaon";
import WhyChooseUsSection from "../components/WhychooseUsSection";
import { FaCheckCircle } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
import {
  FaShieldAlt,
  FaBolt,
  FaFileInvoice,
  FaWhatsapp,
  FaHandshake,
} from "react-icons/fa";
import TargetAudience from "../components/TargetAudience";

const OfficeDetails = () => {
  //Handle Checkout
  // const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/checkout/${office.slug}`, { state: { office } });
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id } = useParams();
  const { slug } = useParams();

  const navigate = useNavigate();
  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchOfficeDetails = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/offices/slug/${slug}`
        );
        // const response = await axios.get(`${backendUrl}/api/offices/${id}`);

        if (response.data.success) {
          setOffice(response.data.data);
        } else {
          console.error("Error fetching office:", response.data.message);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching office details:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!office) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Office Not Found
          </h1>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Offices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
          >
            ← Back to Offices
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{office.name}</h1>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                office.type === "Virtual Office"
                  ? "bg-[#13B3A5] text-white" // Teal for Virtual Office
                  : office.type === "Coworking Space"
                  ? "bg-blue-600 text-white" // Blue for Coworking Space
                  : office.type === "Virtual and Coworking"
                  ? "bg-purple-600 text-white" // Purple for both
                  : "bg-gray-400 text-white" // Default fallback
              }`}
            >
              {office.type}
            </span>

            <span className="text-gray-800 font-bold flex items-center gap-1">
              <span>📍</span>
              <span>
                {office.location.address}, {office.location.city}
              </span>
            </span>
            <div
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center mx-auto 
             bg-gradient-to-r from-amber-500/20 via-yellow-400/10 to-white/10 
             text-gray-900 dark:text-white border border-amber-200/30 
             rounded-full px-3 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium 
             shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in 
             max-w-full sm:max-w-fit leading-snug"
            >
              <span className=" text-gray-800 leading-tight">
                Affordable{" "}
                <span
                  className={`font-semibold  ${
                    office.type === "Virtual Office"
                      ? "text-emerald-600"
                      : office.type === "Coworking Space"
                      ? "text-blue-600"
                      : office.type === "Private Office"
                      ? "text-emerald-600"
                      : office.type === "Meeting Room"
                      ? "text-purple-600"
                      : "text-amber-600"
                  }`}
                >
                  {office.type}
                </span>{" "}
                for Startups & Professionals in{" "}
                <span className="font-semibold text-gray-800 ">
                  {office.location.city}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
              {/* <img
                src={
                  office.images?.[selectedImage] || "/placeholder-office.jpg"
                }
                alt={office.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder-office.jpg";
                }}
              /> */}
              <img
                src={
                  office.images?.[selectedImage]
                    ? office.images[selectedImage].replace(
                        "/upload/",
                        "/upload/f_auto,q_auto:good,w_1400/"
                      )
                    : "/placeholder-office.jpg"
                }
                alt={office.name}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/placeholder-office.jpg";
                }}
              />
            </div>
            {/* Thumbnail Images */}
            {office.images && office.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mb-8">
                {office.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${office.name} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-office.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
            {/* MAIN IMAGE SWIPE SLIDER */}

            {/* new description */}
            <div className="inline-flex items-center gap-1 m-5 bg-white  border border-emerald-300/30 text-emerald-700 dark:text-emerald-300 rounded-full px-2 py-2 text-xs font-medium shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
              <FaHandshake className="text-green-500 h-4 w-4" />
              <span className="text-gray-800">
                Trusted by{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-500">
                  500+ {office.location.city}
                </span>{" "}
                based Businesses
              </span>
            </div>
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Space
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {office.description ||
                  `A beautiful ${office.type.toLowerCase()} located in the heart of ${
                    office.location.city
                  }. Perfect for professionals looking for a productive workspace with modern amenities.`}
              </p>
            </div>
            {/*Start of  Available Services */}

            {office.services && office.services.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-md border border-gray-200 p-3 mt-10 mb-8">
                {/* Included Services Section */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Available Services Included in Your Plan {office.name}
                </h2>
                <p className="text-gray-700 text-xl font-semibold text-center mb-8 max-w-2xl mx-auto">
                  Here’s exactly what you’ll get when you book
                </p>

                {/* Included Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                  {office.services.map((service, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Highlight Bar */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70"></div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        <span className="text-blue-500">💼</span> {service.name}
                      </h3>

                      {/* Description as bullet points */}
                      <ul className="text-gray-700 flex-1 mb-5 text-sm space-y-2 leading-relaxed">
                        {service.description
                          ? service.description
                              .split(";")
                              .filter((point) => point.trim() !== "")
                              .map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-1 hover:text-blue-600 transition-colors duration-200"
                                >
                                  <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{point.trim()}</span>
                                </li>
                              ))
                          : [
                              "Experience professional-grade service at this location.",
                            ].map((d, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                      </ul>
                    </div>
                  ))}

                  {/* Upsell Services Card */}
                  {office.upsellservices &&
                    office.upsellservices.length > 0 && (
                      <div className="group bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-xl border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between relative overflow-hidden">
                        {/* Highlight Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 opacity-70"></div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors flex items-center gap-1">
                          <span className="text-amber-500">🛍️</span>
                          Optional Add-ons (Available at Checkout)
                        </h3>

                        {/* All Upsell Services in One List */}
                        <ul className="text-gray-700 flex-1 mb-5 text-sm space-y-2 leading-relaxed">
                          {office.upsellservices.map((s, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1 hover:text-amber-600 transition-colors duration-200"
                            >
                              <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{s.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            )}
            {/* //end available services */}
            {/* start of upsell services */}

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {office.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Stats Grid */}
            <section id="overview" className="prose prose-lg max-w-none">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {office.capacity || "10+"}
                  </div>
                  <div className="text-gray-600">Seating Capacity</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">Access</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-gray-600">Companies</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">4.9</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Pricing & Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Pricing</h3>

                  {office.pricing.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
                        🎉 Limited Time Offer!
                      </span>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                    </div>
                  )}
                </div>

                <div className="space-y-6 mb-6">
                  {/* --- Yearly Plan --- */}
                  {office.pricing.yearly > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          Yearly
                          {office.pricing.discount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                              {office.pricing.discount}% OFF
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Perfect for long-term use
                        </p>
                      </div>
                      <div className="text-right">
                        {office.pricing.discount ? (
                          <>
                            <div className="flex flex-col items-end">
                              <span className="text-xl font-bold text-green-600">
                                ₹
                                {(
                                  office.pricing.yearly -
                                  (office.pricing.yearly *
                                    office.pricing.discount) /
                                    100
                                ).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-600 line-through">
                                ₹{office.pricing.yearly.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">/year</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl font-bold text-gray-900">
                              ₹{office.pricing.yearly.toLocaleString()}
                            </span>
                            <span className="text-gray-600 text-xl">/year</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- Monthly Plan --- */}
                  {office.pricing.monthly > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          Monthly
                          {office.pricing.discount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                              {office.pricing.discount}% OFF
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Flexible monthly plan
                        </p>
                      </div>
                      <div className="text-right">
                        {office.pricing.discount ? (
                          <>
                            <div className="flex flex-col items-end">
                              <span className="text-xl font-bold text-green-600">
                                ₹
                                {(
                                  office.pricing.monthly -
                                  (office.pricing.monthly *
                                    office.pricing.discount) /
                                    100
                                ).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-600 line-through">
                                ₹{office.pricing.monthly.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">
                              /month
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl font-bold text-gray-900">
                              ₹{office.pricing.monthly.toLocaleString()}
                            </span>
                            <span className="text-gray-600">/month</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- Daily Plan --- */}
                  {office.pricing.daily > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          Daily
                          {office.pricing.discount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                              {office.pricing.discount}% OFF
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">Pay as you go</p>
                      </div>
                      <div className="text-right">
                        {office.pricing.discount ? (
                          <>
                            <div className="flex flex-col items-end">
                              <span className="text-xl font-bold text-green-600">
                                ₹
                                {(
                                  office.pricing.daily -
                                  (office.pricing.daily *
                                    office.pricing.discount) /
                                    100
                                ).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-600 line-through">
                                ₹{office.pricing.daily.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">/day</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-bold text-gray-900">
                              ₹{office.pricing.daily.toLocaleString()}
                            </span>
                            <span className="text-gray-600">/day</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- Hourly Plan --- */}
                  {office.pricing.hourly > 0 && (
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          Hourly
                          {office.pricing.discount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                              {office.pricing.discount}% OFF
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Best for short visits
                        </p>
                      </div>
                      <div className="text-right">
                        {office.pricing.discount ? (
                          <>
                            <div className="flex flex-col items-end">
                              <span className="text-2xl font-bold text-green-600">
                                ₹
                                {(
                                  office.pricing.hourly -
                                  (office.pricing.hourly *
                                    office.pricing.discount) /
                                    100
                                ).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{office.pricing.hourly.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">/hour</span>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{office.pricing.hourly.toLocaleString()}
                            </span>
                            <span className="text-gray-600">/hour</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 text-white cursor-pointer py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                  Book Now
                </button>
                <PopupLeadForm
                  isOpen={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                />

                <div className="flex flex-wrap justify-center items-center gap-3 mt-5">
                  {/* Secure Payment */}
                  <span className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-full px-4 py-2 text-green-700 text-sm font-medium shadow-sm hover:shadow-md transition-all">
                    <FaShieldAlt className="text-green-600" />
                    Secure Payment
                  </span>

                  {/* Instant Activation */}
                  <span className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-full px-4 py-2 text-blue-700 text-sm font-medium shadow-sm hover:shadow-md transition-all">
                    <FaBolt className="text-blue-500" />
                    Instant Activation
                  </span>

                  {/* GST Invoice Available */}
                  <span className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-full px-4 py-2 text-amber-700 text-sm font-medium shadow-sm hover:shadow-md transition-all">
                    <FaFileInvoice className="text-amber-500" />
                    GST Invoice Available
                  </span>
                </div>

                <a
                  href="https://wa.me/919907800600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 mt-4 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all duration-300 w-fit mx-auto"
                >
                  <FaWhatsapp className="text-white text-lg" />
                  Talk to an Expert
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Location
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">📍</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {office.location.address}
                      </p>
                      <p className="text-gray-600">
                        {office.location.city}, {office.location.zip}
                      </p>
                    </div>
                  </div>

                  {office.capacity && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">👥</span>
                      <span className="text-gray-700">
                        Capacity: {office.capacity} people
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 bg-gray-200 rounded-lg overflow-hidden">
                  {office.mapEmbed ? (
                    <iframe
                      src={office.mapEmbed}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-gray-500">
                      <p>Map not available for this office</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {office && (
        <RelatedOffices
          officeSlug={office.slug}
          city={office.location.city}
          type={office.type}
        />
      )}

      <ModernComparisonSection />
      {/* <WhyChooseUsSection /> */}
      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us for Your {office.type}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {office.type === "Coworking Space"
                ? "Join India's fastest-growing community of innovators, creators, and business leaders."
                : "Join 10,000+ businesses that trust us for their corporate identity and compliance needs."}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(office.type === "Coworking Space"
              ? [
                  {
                    icon: "🤝",
                    title: "Collaborative Environment",
                    desc: "Work alongside motivated professionals and expand your network effortlessly.",
                  },
                  {
                    icon: "🕓",
                    title: "Flexible Plans",
                    desc: "Choose hourly, daily, or monthly options to suit your business needs.",
                  },
                  {
                    icon: "🌇",
                    title: "Premium Locations",
                    desc: "Offices in prime business hubs for better client impressions.",
                  },
                  {
                    icon: "☕",
                    title: "All-Inclusive Amenities",
                    desc: "High-speed WiFi, meeting rooms, printing, and refreshments included.",
                  },
                  {
                    icon: "🎯",
                    title: "Productivity-Focused Design",
                    desc: "Spaces engineered to help you focus, create, and achieve your goals.",
                  },
                  {
                    icon: "💡",
                    title: "Networking Events",
                    desc: "Regular workshops and events to connect with like-minded professionals.",
                  },
                ]
              : [
                  {
                    icon: "🏢",
                    title: "Professional Business Address",
                    desc: "Establish a credible presence without renting a physical office.",
                  },
                  {
                    icon: "📦",
                    title: "Mail Handling & Support",
                    desc: "We manage your correspondence professionally while you focus on growth.",
                  },
                  {
                    icon: "💰",
                    title: "Affordable & Scalable",
                    desc: "Start small and scale your virtual services as your business grows.",
                  },
                  {
                    icon: "📄",
                    title: "GST & MCA Compliant",
                    desc: "Approved spaces for seamless business registration and documentation.",
                  },
                  {
                    icon: "💻",
                    title: "Digital Dashboard",
                    desc: "Manage all your documents and services through our online platform.",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Activation",
                    desc: "Get your virtual office fully operational within 24 hours.",
                  },
                ]
            ).map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group"
              >
                {/* Icon with hover effect */}
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  10K+
                </div>
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
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  24/7
                </div>
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
          <div className="text-center mt-12">
            <button
              className={`
          ${
            office.type === "Coworking Space"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }
          text-white font-semibold text-lg
          px-8 py-4 rounded-xl
          transition-all duration-300
          transform hover:scale-105
          shadow-lg hover:shadow-xl
          focus:outline-none focus:ring-4
          ${
            office.type === "Coworking Space"
              ? "focus:ring-green-300"
              : "focus:ring-blue-300"
          }
        `}
              onClick={() => setIsFormOpen(true)}
            >
              {office.type === "Coworking Space"
                ? "Book Your Coworking Tour"
                : "Start Your Virtual Office Today"}
            </button>

            {/* CTA Subtext */}
            <p className="text-gray-600 mt-4 text-sm">
              {office.type === "Coworking Space"
                ? "Free day pass available • No security deposit • Cancel anytime"
                : "No commitment required • Setup in 24 hours • Money-back guarantee"}
            </p>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <Testimonials />
      <TargetAudience />

      <FaqGurgaon />
    </div>
  );
};

export default OfficeDetails;
