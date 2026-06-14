import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position to the top on every route change.
 *
 * React Router preserves the previous scroll offset across navigations, which
 * lands the user mid-page on the new route. Mount this once inside the Router.
 * In-page anchor links (locations with a hash) are left untouched.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
