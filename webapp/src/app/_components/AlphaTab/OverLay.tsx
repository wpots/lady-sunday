import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import { useContext, useEffect, useRef } from "react";

export default function Overlay() {
  const overlay = useRef<HTMLDivElement>(null);
  const { apiInstance, events } = useContext(AlphaTabContext);

  useEffect(() => {
    if (apiInstance) {
      events("renderStarted", () => (overlay?.current ? (overlay.current.style.display = "flex") : null));
      events("renderFinished", () => (overlay?.current ? (overlay.current.style.display = "none") : null));
    }
  }, [apiInstance, events]);
  return (
    <div className="at-overlay" ref={overlay}>
      <div className="at-overlay-content">Music Sheet is loading ....</div>
    </div>
  );
}
