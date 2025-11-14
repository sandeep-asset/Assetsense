// App.jsx or Layout.jsx
import { FaWhatsapp } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function StickyWatsapp() {
  return (
    <>
      <Outlet /> {/* All your pages will render here */}
      {/* Floating WhatsApp button */}
      <div className="fixed bottom-2.5 right-4 z-50 animate-scale-in">
        <a
          href="https://wa.me/919907800600"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white shadow-xl rounded-full p-2 transition-all duration-300 hover:shadow-2xl"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}

export default StickyWatsapp;
