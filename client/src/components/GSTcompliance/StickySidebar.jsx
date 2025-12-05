import { useState } from "react";
import { FaDownload, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

const StickySidebar = ({ onDownloadClick })=> {
  const [phone, setPhone] = useState("");

  return (
    <div className="sticky top-8 space-y-6">
      {/* Download CTA Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            <FaDownload className="h-4 w-4" />
            Download Checklist
          </h3>
        </div>
        <div className="p-5">
          <p className="mb-4 text-sm text-gray-600">
            Get the complete checklist as a PDF to use offline and share with
            your team.
          </p>
          <button
            onClick={onDownloadClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Free PDF
            <FaArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expert Help Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4">
          <h3 className="font-semibold text-white">Need Expert Help?</h3>
        </div>
        <div className="p-5">
          <p className="mb-4 text-sm text-gray-600">
            Our experts can help you with GST registration and ensure 100%
            approval.
          </p>
          <div className="space-y-3">
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Your phone number"
                className="w-full rounded-lg border border-gray-300 px-10 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-white transition-all hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Request Callback
            </button>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm">
        <div className="space-y-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">10,000+</p>
            <p className="text-sm text-gray-600">Successful Registrations</p>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div>
            <p className="text-3xl font-bold text-emerald-600">98%</p>
            <p className="text-sm text-gray-600">First-Time Approval</p>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div>
            <p className="text-3xl font-bold text-purple-600">24/7</p>
            <p className="text-sm text-gray-600">Expert Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StickySidebar;