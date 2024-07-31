import { useEffect } from "react";

import { useLocation } from "react-router-dom";

export const ScrollToTopFn = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    ScrollToTopFn();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
