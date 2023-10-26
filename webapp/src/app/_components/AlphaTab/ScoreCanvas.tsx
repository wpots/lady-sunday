import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import { useContext, useEffect, useRef } from "react";

export default function ScoreCanvas() {
  const tab = useRef(null);
  const { initAlphaTab, apiReady } = useContext(AlphaTabContext);
  useEffect(() => {
    if (apiReady && tab.current) initAlphaTab(tab.current);
  }, [apiReady]);

  return <div className="at-main" ref={tab}></div>;
}
