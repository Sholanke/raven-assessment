import React, { useEffect } from "react";

export default function useClickOutside(onClick: () => void, el) {
  useEffect(() => {
    if (!el) return;
    const handleClick = (e) => {
      if (!el.contains(e.target)) onClick();
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [el]);
}
