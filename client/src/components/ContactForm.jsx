// src/components/ContactForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Virtual Office",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Replace this with your business WhatsApp number (include country code, no '+')
  const whatsappNumber = "919876543210"; // Example: 91 for India
  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in your ${formData.service}. My name is ${
      formData.name || "____"
    } from ${formData.city || "____"}. Please contact me back.`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Google Form URL (replace with your formResponse link)
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfSdWaa2u_xJQ6aLlq7-SSl5tVsCbL7dhNyzxrZt2xzodxLbA/formResponse";

  // Google Form entry IDs (replace these with your own form entry IDs)
  const ENTRY_IDS = {
    name: "entry.38467498",
    phone: "entry.434722229",
    service: "entry.666341266",
    city: "entry.1194871815",
    message: "entry.1844357054", // Update this with your actual message field ID
  };

  const handleSubmit = async (e) => {
    window.dataLayer.push({
      event: "form_submit",
      form_name: "Contact Form",
      page: window.location.pathname,
    });
    e.preventDefault();

    try {
      const form = new FormData();
      form.append(ENTRY_IDS.name, formData.name);
      form.append(ENTRY_IDS.phone, formData.phone);
      form.append(ENTRY_IDS.service, formData.service);
      form.append(ENTRY_IDS.city, formData.city);
      form.append(ENTRY_IDS.message, formData.message);

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors", // allows silent submission to Google Forms
        body: form,
      });

      // Success toast
      toast.success(
        `Thank you ${formData.name} for Contact Us. Our Team will Contact You Soon . `
      );
      // Reset form
      setFormData({
        name: "",
        phone: "",
        service: "Virtual Office",
        city: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 w-full max-w-lg mx-auto md:mx-0">
      {/* Toast Container */}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Virtual Office">Virtual Office</option>
            <option value="Coworking Space">Coworking Space</option>
            <option value="Virtual and Coworking">Virtual and Coworking</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Message
          </label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
        >
          <FaWhatsapp className="text-xl" />
          Chat on WhatsApp
        </a>
      </form>
    </div>
  );
};

export default ContactForm;
