import React, { useState } from "react";
import { FaUsers, FaWifi, FaClock, FaChartLine, FaStar } from "react-icons/fa";
import PSQoverview from "/PalmSquare/PSQ 2.jpg";
import PopupLeadForm from "./LeadForm";

const Coworking = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-sm font-medium mb-4">
            Premium Workspaces
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-[#1447E6]">Coworking</span> Spaces That
            Inspire
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Modern, fully-equipped workspaces designed for productivity and
            collaboration. Perfect for freelancers, startups, and growing teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="animate-fade-in-up">
            <img
              src={PSQoverview}
              alt="Modern coworking space with collaborative areas"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>

          <div className="space-y-6 animate-fade-in-up">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Flexible Seating Options
                </h3>
                <p className="text-gray-600">
                  Hot desks, dedicated desks, or private cabins for teams of
                  1-50 people
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaWifi className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Premium Amenities
                </h3>
                <p className="text-gray-600">
                  High-speed WiFi, meeting rooms, printing, refreshments & more
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaClock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  24/7 Access
                </h3>
                <p className="text-gray-600">
                  Flexible workspace access for every schedule, including{" "}
                  <span className="text-gray-900 font-semibold">
                    night shifts
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaChartLine className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Networking Events
                </h3>
                <p className="text-gray-600">
                  Connect with like-minded professionals and grow your network
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center text-sm gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white shadow-lg  px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* <FaBuilding className="h-5 w-5" /> */}
              Explore Coworking Spaces
            </button>
            <PopupLeadForm
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        </div>

        {/* Stats Card */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl rounded-lg">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">₹8,000+</div>
              <div className="text-blue-100">Starting Price/Month</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Prime Locations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 flex items-center justify-center">
                4.8
                <FaStar className="h-5 w-5 text-yellow-300 ml-1" />
              </div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coworking;
