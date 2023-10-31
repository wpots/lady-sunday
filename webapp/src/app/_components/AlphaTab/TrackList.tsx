"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";
import TrackItem from "./TrackItem";
import { Collapse } from "antd";
import TrackControls, { TrackToggles } from "./TrackControls";
import { DownOutlined } from "@ant-design/icons";

import "./TrackList.scss";

export default function TrackList() {
  const { tracks } = useContext(AlphaTabContext);
  const [trackToggles, setTrackToggles] = useState<TrackToggles>({});

  const handleToggleChange = (toggles: TrackToggles) => {
    console.log("added", toggles);
    setTrackToggles(prevToggles => {
      return {
        ...toggles,
        ...prevToggles,
      };
    });
  };

  const extendedTracks = tracks.map((track, key) => ({
    key: `${key}`,
    label: <TrackItem id={`t-${key}`} track={track} state={trackToggles?.[key]} />,
    children: <TrackControls id={key} onToggleChange={handleToggleChange} />,
    collapsible: "icon",
  }));

  return (
    <Collapse
      // ghost={true}
      size="small"
      //@ts-ignore
      items={extendedTracks}
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      expandIconPosition="end"
      style={{ width: "100%", height: "100%", overflowY: "scroll", borderRadius: 0, marginBottom: "88px" }}
    />
  );
}
