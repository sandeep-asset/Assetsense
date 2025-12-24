import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBuilding, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfo3HyK19kkztwi3e33-OprpJKeDnDlMXEbQMqxjNbKrNL_xQ/formResponse";

const PopupLeadForm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    requirement: "",
    otherService: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.dataLayer.push({
      event: "form_submit",
      form_name: "Contact Form",
      page: window.location.pathname,
    });

    const finalRequirement =
      formData.requirement === "Other"
        ? formData.otherService
        : formData.requirement;

    // Prepare data for Google Form
    const form = new FormData();
    form.append("entry.1266666314", formData.name);
    form.append("entry.2050731", formData.phone);
    form.append("entry.1882873407", formData.city);
    form.append("entry.275524318", finalRequirement);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors", // submit silently (no new tab)
        body: form,
      });

      // Reset form & close popup
      setFormData({
        name: "",
        phone: "",
        city: "",
        requirement: "",
        otherService: "",
      });

      toast.success(
        `Thank you ${formData.name} for Contact Us. Our Team will Contact You Soon . `
      );
      onClose();
      navigate(`/search?type=${formData.requirement}`);
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaBuilding className="text-blue-600" />
          Contact US
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* City */}
          <input
            type="text"
            placeholder="City (e.g. Gurgaon, Delhi...)"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Requirement */}
          <div className="flex flex-col">
            <select
              value={formData.requirement}
              onChange={(e) =>
                setFormData({ ...formData, requirement: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Service</option>
              <option value="Coworking Space">Coworking Space</option>
              <option value="Virtual Office">Virtual Office</option>
              <option value="Virtual and Coworking">
                Virtual and Coworking
              </option>
              <option value="Meeting Room">Meeting Room</option>
              <option value="Private Cabin">Private Cabin</option>
              <option value="Both Services">Both Services</option>
              <option value="Other">Other</option>
            </select>

            {/* "Other" input field */}
            {formData.requirement === "Other" && (
              <input
                type="text"
                placeholder="Please specify your requirement"
                value={formData.otherService}
                onChange={(e) =>
                  setFormData({ ...formData, otherService: e.target.value })
                }
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-md transition-all"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupLeadForm;
