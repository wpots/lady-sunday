"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";
import TrackItem from "./TrackItem";
import { Collapse } from "antd";
import TrackControls, { TrackToggles } from "./TrackControls";
import { DownOutlined } from "@ant-design/icons";

import "./TrackList.scss";

export default function TrackList({ collapsed }: { collapsed: boolean }) {
  const { tracks } = useContext(AlphaTabContext);
  const [trackToggles, setTrackToggles] = useState<TrackToggles>({});
  const [openTracks, setOpenTracks] = useState<string | string[]>([]);

  const handleToggleChange = (toggles: TrackToggles) => {
    // console.log(toggles);
    setTrackToggles(prevToggles => {
      return {
        ...prevToggles,
        ...toggles,
      };
    });
  };

  useEffect(() => {
    if (collapsed) setOpenTracks([]);
  }, [collapsed]);

  const handleOpenTracks = (keys: string | string[]) => {
    setOpenTracks(keys);
  };

  const extendedTracks = tracks.map((track, key) => {
    const id = `t-${key}`;
    return {
      key: id,
      label: <TrackItem id={id} track={track} toggles={trackToggles?.[id]} />,
      children: <TrackControls id={id} idx={key} onToggleChange={handleToggleChange} />,
    };
  });

  return (
    <Collapse
      collapsible="icon"
      activeKey={openTracks}
      onChange={handleOpenTracks}
      size="small"
      items={extendedTracks}
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      expandIconPosition="end"
      style={{ width: "100%", height: "100%", overflowY: "scroll", borderRadius: 0, marginBottom: "88px" }}
    />
  );
}
