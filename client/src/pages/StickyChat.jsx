// StickyChat.jsx or Layout.jsx
import { FaComments } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function StickyChat() {
  return (
    <>
      <Outlet />

      {/* Floating Chat Button */}
      <div className="fixed bottom-2 left-3 z-50 animate-scale-in">
        <a
          href="https://ai.assetsense.in/webhook/6d094791-5412-4d2c-bdce-7335e980adf9/chat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us"
          className="
            flex items-center justify-center
            bg-blue-600 hover:bg-blue-700
            text-white shadow-xl
            rounded-full p-3
            transition-all duration-300
            hover:shadow-2xl
          "
        >
          <FaComments className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}

export default StickyChat;
