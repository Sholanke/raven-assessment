import { useEffect, useRef } from "react";

export default function useResizeObserver(cb, elRef) {
  const observerRef = useRef<any>();

  useEffect(() => {
    if (observerRef.current || !elRef.current) return;
    observerRef.current = new ResizeObserver(cb);
    observerRef.current.observe(elRef.current);
  }, []);
}
