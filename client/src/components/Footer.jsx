import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const FooterNew = () => {
  return (
    <div>
      <footer className="bg-[#0E141B] text-white py-12">
        <div className="container mx-auto px-4">
          {/* Four Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Company Info */}
            <div className="space-y-4">
              <div className="text-3xl font-bold mb-2">
                <a href="/">
                  <img className="w-40 h-16" src="/Assetsensefinallogo.webp" alt="logo" />
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your premier destination for flexible workspace solutions. We
                provide modern, professional environments designed for
                productivity and collaboration.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/AssetSenseIndia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/mohan_skills"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/asset-sense-pvt-ltd"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/assetsense1/#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Our Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/search"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Coworking Spaces
                  </a>
                </li>
                <li>
                  <a
                    href="https://workspaces.assetsense.in/virtual-office"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Virtual Office
                  </a>
                </li>
                <li>
                  <a
                    href="https://workspaces.assetsense.in/virtual-office-in-mumbai"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Virtual Office in Mumbai
                  </a>
                </li>
                <li>
                  <a
                    href="/compliance/gst-registration-checklist"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    GST Compliance Shield
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Day Passes
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Conference Rooms
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/our-services"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">
                    Office Suite: 02-007, 2nd Floor,
                    <br />
                    Emaar The Palm Square,
                    <br />
                    Golf Course Road Extn. Sector 66,
                    <br />
                    Gurgaon, Haryana (INDIA)
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                  <a
                    href="tel:+919907800600"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    +91 9907800600
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-gray-400" />
                  <a
                    href="mailto:info@assetsense.in"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    info@assetsense.in
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Business Hours
                </h4>
                <p className="text-gray-400 text-sm">24/7 Access for Members</p>
                <p className="text-gray-400 text-sm">
                  Support: Mon-Sat, 10 AM - 6 PM
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 space-y-2">
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <a
                href="/privacy-policy"
                className="hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/refund-policy"
                className="hover:text-white transition-colors text-sm"
              >
                Refund Policy
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/terms-conditions"
                className="hover:text-white transition-colors text-sm"
              >
                Terms & Conditions
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/sitemap"
                className="hover:text-white transition-colors text-sm"
              >
                Sitemap
              </a>
            </div>
            <p className="text-sm">© 2025 Asset Sense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterNew;
