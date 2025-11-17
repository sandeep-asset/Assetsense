import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScNBsQ-3U9I56XIjOQ53yz-kQWJJMXlpdFNtrvuXuJ0xANtyw/formResponse";

    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.1729247519", formData.name); // name
    formDataGoogle.append("entry.1818236403", formData.phone); // phone
    formDataGoogle.append("entry.1499443617", formData.email); // email
    formDataGoogle.append("entry.951813145", formData.property); // property
    formDataGoogle.append("entry.382874411", formData.message); // message

    try {
      await fetch(formUrl, {
        method: "POST",
        body: formDataGoogle,
        mode: "no-cors",
      });

      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        property: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      type: "phone",
      icon: FaPhone,
      title: "Call Us",
      content: "+91 9907800600",
      action: "tel:+919907800600",
    },
    {
      type: "email",
      icon: FaEnvelope,
      title: "Email Us",
      content: "info@assetsense.in",
      action: "mailto:info@assetsense.in",
    },
    {
      type: "address",
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content:
        "207, 2nd Floor, Emaar The Palm Square, Rajesh Pilot Marg, Sector 66, Gurugram, Haryana - 122101",
      action: "#",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      content: "Mon-Sat: 10AM-6PM",
      action: "#",
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      id="contact"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-4">
            <span className="text-sm font-medium text-blue-600">
              Get In Touch
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Maximize Your Commercial Property Returns
            <span className="block text-blue-600">with Asset Sense</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to transform your property into a high-yield investment? Let
            our experts provide you with a comprehensive consultation and
            customized strategy for maximum returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold mb-6">
                Schedule Your Free Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name*
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number*
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Location
                  </label>
                  <input
                    id="property"
                    name="property"
                    type="text"
                    value={formData.property}
                    onChange={handleChange}
                    placeholder="City or area of your property"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your property and goals..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center"
                >
                  Get Free Consultation
                  <FaArrowRight className="ml-2" />
                </button>
              </form>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaWhatsapp className="text-2xl text-green-600" />
                    <div>
                      {/* <p className="font-medium text-sm text-green-800">
                        Quick WhatsApp Consultation
                      </p> */}
                      <p className="text-xs text-green-600">
                        Get instant response
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-2 py-2 border text-xs border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white"
                    onClick={() =>
                      window.open("https://wa.me/919907800600", "_blank")
                    }
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info + Map */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                let iconClasses = "text-blue-600 text-xl";
                if (info.type === "address")
                  iconClasses = "text-3xl px-1 mx-2.5 text-blue-600";

                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <IconComponent className={iconClasses} />
                    </div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <a
                        href={info.action}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {info.content}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Embed */}
            <div className="mt-10">
              <h4 className="text-xl font-semibold mb-4">Our Location</h4>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.563726432473!2d77.05070309999999!3d28.4022422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d236820495cc1%3A0x3bc02b2839b577f8!2sAsset%20Sense%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1758983662941!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
