import {
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

const Gstcta = () => {
  return (
    <section className="border-t bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Still Worried About GST Rejection?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            We guarantee document verification and query resolution. Let our
            experts handle your GST registration with 100% accuracy and
            compliance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm sm:gap-12">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-3">
                <FaShieldAlt className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-700">
                100% Approval Guarantee
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 p-3">
                <FaClock className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="font-medium text-gray-700">
                3-5 Working Days
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-purple-100 to-pink-100 p-3">
                <FaCheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium text-gray-700">
                Expert CA Support
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            {/* Get My GST Number Now → Call Mobile Number */}
            <a href="tel:9907800600">
              <button className="flex items-center cursor-pointer gap-2 rounded-xl  px-8 py-4 text-lg font-semibold text-white shadow-lg bg-blue-600 transition-all duration-300   focus:outline-none focus:ring-4 focus:ring-blue-500/30">
                Get My GST Number Now
                <FaPhoneAlt className="h-5 w-5" />
              </button>
            </a>

            {/* Talk to GST Expert → WhatsApp */}
            <a
              href="https://wa.me/9907800600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-2 rounded-xl border-2 cursor-pointer border-blue-100 bg-green-400 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30">
                Talk to GST Expert
                <FaWhatsapp className="h-5 w-5" />
              </button>
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Over 10,000 businesses trust us for their GST registration &
            compliance
          </p>
        </div>
      </div>
    </section>
  );
};
export default Gstcta;
