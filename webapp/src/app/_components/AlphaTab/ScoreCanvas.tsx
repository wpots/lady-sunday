"use client";
import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import { Grid } from "antd";
import { useContext, useEffect, useRef } from "react";

const { useBreakpoint } = Grid;

export default function ScoreCanvas({ style }: { style?: any }) {
  const tab = useRef(null);
  const { initAlphaTab } = useContext(AlphaTabContext);

  useEffect(() => {
    if (tab.current && initAlphaTab) initAlphaTab(tab.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab.current]);

  return <div style={...style} ref={tab}></div>;
}
