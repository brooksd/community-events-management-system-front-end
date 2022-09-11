import { useEffect, useState } from "react";

const useMediaQuery = (mQuery) => {
  switch (mQuery) {
    case "Tablet":
      mQuery = "(max-width: 768px)";
      break;
    default:
      mQuery = "(min-width: 1200px)";
  }

  const [matches, setMatches] = useState(window?.matchMedia(mQuery).matches);

  useEffect(() => {
    // Prevent SSR issues
    if (typeof window !== "undefined") {
      const mediaMatch = window.matchMedia(mQuery);

      const handler = (e) => setMatches(e.currentTarget.matches);

      if (mediaMatch.addListener) {
        mediaMatch.addListener(handler);
      } else {
        mediaMatch.addEventListener("change", handler);
      }

      return () => {
        if (mediaMatch.addListener) {
          mediaMatch.removeListener(handler);
        } else {
          mediaMatch.removeEventListener("change", handler);
        }
      };
    }
  }, [mQuery]);

  return matches;
};

export default useMediaQuery;
