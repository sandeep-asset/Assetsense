// Hero.jsx
import { useState, useEffect, useRef } from "react";

const VirtualGurgaon = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will contact you shortly.");
  };

  // Floating label effect
  useEffect(() => {
    const inputs = document.querySelectorAll(".floating-input");

    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.nextElementSibling.classList.add("label-active");
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.nextElementSibling.classList.remove("label-active");
        }
      });
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  //   offoce location

  const scrollContainerRef = useRef(null);

  const [offices, setOffices] = useState([
    {
      id: 1,
      name: "DLF Phase 2 & 3",
      startingPrice: 833,
      image:
        "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=500&q=60",
      description: "Premium business district with excellent connectivity",
    },
    {
      id: 2,
      name: "DLF Phase 1 & 4",
      startingPrice: 833,
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=60",
      description: "Modern commercial complex with ample amenities",
    },
    {
      id: 3,
      name: "Golf Course Road",
      startingPrice: 749,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=60",
      description: "Prestigious location with luxury office spaces",
    },
    {
      id: 4,
      name: "Sohna Road",
      startingPrice: 749,
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=500&q=60",
      description: "Growing commercial corridor with great potential",
    },
    {
      id: 5,
      name: "Cyber City",
      startingPrice: 899,
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=500&q=60",
      description: "Tech hub with modern infrastructure",
    },
    {
      id: 6,
      name: "MG Road",
      startingPrice: 799,
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=500&q=60",
      description: "Historic commercial area with excellent facilities",
    },
  ]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Function to add a new office (demo)
  const addOffice = () => {
    const newOffice = {
      id: offices.length + 1,
      name: `New Location ${offices.length + 1}`,
      startingPrice: Math.floor(Math.random() * 200) + 700,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=60",
      description: "New premium office location",
    };
    setOffices([...offices, newOffice]);
  };

  return (
    // Hero Section
    <section className="relative pt-12 pb-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <div className="mb-6">
              <span className="text-2xl font-bold text-white">myHQ</span>
              <span className="ml-2 text-blue-100 text-sm">-by ANAROCK-</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bring your business to Gurgaon with a Virtual Office
            </h1>
            <p className="text-xl mb-8">
              Set-up a virtual office in prime locations all across Gurgaon and
              enjoy premium services of a real office space.
            </p>

            {/* Mobile Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 mb-8 lg:hidden">
              <h3 className="text-xl font-bold mb-4">
                Know more about Virtual office in Gurgaon
              </h3>
              <p className="text-gray-600 mb-4">
                Stress free registrations guaranteed with myHQ
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="floating-label relative">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    className="floating-input w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label className="absolute left-0 top-3 text-gray-500 transition-all duration-200 pointer-events-none">
                    Name
                  </label>
                </div>
                <div className="floating-label relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder=" "
                    className="floating-input w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label className="absolute left-0 top-3 text-gray-500 transition-all duration-200 pointer-events-none">
                    Mobile number
                  </label>
                </div>
                <div className="floating-label relative">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    className="floating-input w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="absolute left-0 top-3 text-gray-500 transition-all duration-200 pointer-events-none">
                    Email
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Quote
                </button>
              </form>
              <div className="mt-4 text-center">
                <button className="text-blue-600 font-semibold flex items-center justify-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Request Callback
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition">
                Get in touch to know more
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition">
                Request Callback
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Virtual Office Clients</div>
              </div>
              <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Prime Locations</div>
              </div>
            </div>
          </div>

          {/* Right Form (Sticky) */}
          <div className="lg:w-1/2">
            <div className="sticky top-4 hidden lg:block">
              <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
                <h3 className="text-2xl font-bold mb-2">
                  Know more about Virtual office in Gurgaon
                </h3>
                <p className="text-gray-600 mb-6">
                  Stress free registrations guaranteed with myHQ
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="floating-label relative">
                    <input
                      type="text"
                      name="name"
                      placeholder=" "
                      className="floating-input w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label className="absolute left-0 top-3 text-gray-500 transition-all duration-200 pointer-events-none">
                      Name
                    </label>
                  </div>
                  <div className="floating-label relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder=" "
                      className="floating-input w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <label className="absolute left-0 top-3 text-gray-500 transition-all duration-200 pointer-events-none">
                      Mobile number
                    </label>
                  </div>
                  <div className="floating-label relative">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      className="floating-input w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="absolute left-0 top-3 text-gray-500 transition-all duration-200 pointer-events-none">
                      Email
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                  >
                    Get Quote
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <button className="text-blue-600 font-semibold flex items-center justify-center w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Request Callback
                  </button>
                </div>
              </div>

              {/* Additional Form Info */}
              <div className="mt-6 bg-blue-500 bg-opacity-10 p-4 rounded-lg border border-blue-300 border-opacity-30">
                <div className="flex items-center text-blue-100 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="font-medium">Lowest Price Guarantee</span>
                </div>
                <div className="flex items-center text-blue-100 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">1hr Average Response Time</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="font-medium">Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating contact button for mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .floating-input:focus + label,
        .floating-input:not(:placeholder-shown) + label,
        .label-active {
          top: -15px !important;
          font-size: 12px !important;
          color: #2563eb !important;
        }
      `}</style>
    </section>

    // office location
  );
};
export default VirtualGurgaon;
