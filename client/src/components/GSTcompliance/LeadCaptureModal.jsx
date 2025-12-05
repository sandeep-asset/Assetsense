import { useState } from "react";
import { FaDownload, FaEnvelope, FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const LeadCaptureModal = ({ open, onOpenChange })=> {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
      setFormData({ name: "", email: "", phone: "" });
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <IoClose className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
              <FaDownload className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Download Free Checklist
            </h2>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <FaDownload className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Check Your Email!
              </h3>
              <p className="mt-2 text-gray-600">
                We've sent the PDF checklist to your email address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm text-gray-600">
                Enter your details below and we'll send the complete GST
                Registration Checklist directly to your inbox.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="name"
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-gray-300 px-10 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-gray-300 px-10 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-gray-300 px-10 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaDownload className="h-4 w-4" />
                Send Me the Checklist
              </button>

              <p className="text-center text-xs text-gray-500">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeadCaptureModal;