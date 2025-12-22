import React, { useState, useRef } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaFileInvoiceDollar,
  FaClock,
  FaMapMarkerAlt,
  FaCity,
  FaFileContract,
  FaArrowRight,
} from "react-icons/fa";

const TestimonialsGurgaon = () => {
  const testimonialData = [
    {
      id: 1,
      name: "Ranjeet Sinha",
      position: "Founder, ShipKart",
      image: "/client/Ranjeet.webp",
      content:
        '"Asset Sense provided excellent virtual office space in Gurgaon, helping my startup establish a professional presence without high costs. I saved ₹75,000 annually on office rent."',
      icon: <FaFileInvoiceDollar className="text-green-500" />,
      tag: "95% cost savings",
    },
    {
      id: 2,
      name: "Jasleen Kaur",
      position: "CFO, SaaSBee",
      image: "/client/jusleen.webp",
      content:
        '"I highly recommend Asset Sense for virtual office space Delhi. Our bank asked for one extra doc and support replied within 3 minutes!"',
      icon: <FaClock className="text-blue-500" />,
      tag: "3-min response time",
    },
    {
      id: 3,
      name: "Manish Sharma",
      position: "Director, TechFlow",
      image: "/client/Manish.webp",
      content:
        '"Choosing Asset Sense for a virtual office in Jaipur was a game-changer. They helped us expand to 5 states without physical presence."',
      icon: <FaMapMarkerAlt className="text-red-500" />,
      tag: "5-state expansion",
    },
    {
      id: 4,
      name: "Anita Shah",
      position: "CEO, TechInnovate",
      image: "/client/ankita.webp",
      content:
        '"Asset Sense handled our Noida GST registration effortlessly — prestigious address, full compliance, zero stress!"',
      icon: <FaCity className="text-indigo-500" />,
      tag: "Single-window service",
    },
    {
      id: 5,
      name: "Praveen Kumar",
      position: "Director, EcomSolutions",
      image: "/client/rahul.webp",
      content:
        '"Affordable virtual office Ahmedabad, ready documents within hours! Quickest setup we’ve experienced."',
      icon: <FaFileContract className="text-teal-500" />,
      tag: "Quick documentation",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[index];
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentIndex(index);
    }
  };

  const scrollNext = () =>
    scrollToIndex((currentIndex + 1) % testimonialData.length);

  const scrollPrev = () =>
    scrollToIndex(
      (currentIndex - 1 + testimonialData.length) % testimonialData.length
    );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why 5k+ Businesses Trust{" "}
            <span className="text-blue-600">Asset Sense</span>
          </h2>
          <p className="text-lg text-gray-600">
            Rated <span className="font-semibold text-yellow-500">4.9★</span> on
            Google — loved for reliability, support, and speed
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100 md:block"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100  md:block"
          >
            <FaChevronRight className="text-gray-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-6 scrollbar-hide"
          >
            {testimonialData.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 w-80 sm:w-72 md:w-96 snap-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border border-gray-100"
              >
                <div className="flex flex-col items-center mb-4">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover  shadow-md mb-3"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 mb-3">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.position}</p>
                </div>

                <p className="text-gray-700 italic mb-4 text-sm md:text-base leading-relaxed">
                  {t.content}
                </p>

                <div className="flex justify-center items-center text-sm text-gray-600">
                  {t.icon}
                  <span className="ml-2 font-medium">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonialData.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === i ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/Asset+Sense+Workspaces/@28.4022422,77.0507031,17z/data=!4m16!1m9!3m8!1s0x390d236820495cc1:0x3bc02b2839b577f8!2sAsset+Sense+Workspaces!8m2!3d28.4022422!4d77.0507031!9m1!1b1!16s%2Fg%2F11ydwv2hjq!3m5!1s0x390d236820495cc1:0x3bc02b2839b577f8!8m2!3d28.4022422!4d77.0507031!16s%2Fg%2F11ydwv2hjq?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D

"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Read Google Reviews <FaArrowRight className="ml-2" />
          </a>
        </div>

        {/* Logos */}
        <div className="mt-20 text-center">
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
                    src="/logos/Alcravo.webp"
                    alt="Alcravo"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/Andhrola.webp"
                    alt="Andhrola"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/bos.webp"
                    alt="Andhrola"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/sachar.webp"
                    alt="Andhrola"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/sstrader.webp"
                    alt="Andhrola"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/hindustanGold.png"
                    alt="HindustanGold"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/pajson.webp"
                    alt="Pajson"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/dreamlingerie.webp"
                    alt="Dream Lingerie"
                    className="h-16 w-auto object-contain"
                  />

                  <img
                    src="/logos/saurabh.webp"
                    alt="Saurabh Eng"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/abhiyantri.webp"
                    alt="Abhiyantri"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/halejo.webp"
                    alt="Halejo"
                    className="h-16 w-auto object-contain"
                  />
                  <img
                    src="/logos/codegyan.webp"
                    alt="Halejo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsGurgaon;
