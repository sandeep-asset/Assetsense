import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollRestore() {
  const location = useLocation();

  useEffect(() => {
    const homeKey = "scroll-home";

    const restoreScroll = () => {
      const savedScrollY = sessionStorage.getItem(homeKey);
      if (savedScrollY) {
        const scrollY = parseInt(savedScrollY, 10);

        // Wait until content is visually ready
        const checkAndScroll = (attempts = 0) => {
          if (attempts > 20) return; // safety stop after 2s

          const bodyHeight = document.body.scrollHeight;
          if (bodyHeight < scrollY + window.innerHeight && attempts < 20) {
            // Content not tall enough yet — wait more
            setTimeout(() => checkAndScroll(attempts + 1), 100);
          } else {
            // Now safe to scroll
            window.scrollTo({ top: scrollY, behavior: "auto" });
          }
        };

        checkAndScroll();
      }
    };

    // Restore only when user is back to home page
    if (location.pathname === "/") {
      requestAnimationFrame(() => {
        setTimeout(restoreScroll, 100);
      });
    }

    // Save scroll when leaving home
    return () => {
      if (location.pathname === "/") {
        sessionStorage.setItem(homeKey, window.scrollY);
      }
    };
  }, [location.pathname]);
}
