import React, { useState } from "react";
import PopupLeadForm from "./LeadForm";

const FloatingLeadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 md:bottom-16 md:left-15 left-1/2 -translate-x-1/2 z-40 bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        Book Now
      </button>

      {/* Popup Form */}
      <PopupLeadForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default FloatingLeadButton;
