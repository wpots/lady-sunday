"use client";
import { useContext, useEffect, useRef } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";
import TrackItem from "./TrackItem";
import { Collapse } from "antd";
import TrackControls from "./TrackControls";
import { DownOutlined } from "@ant-design/icons";

export default function TrackList() {
  const { tracks } = useContext(AlphaTabContext);

  const extendedTracks = tracks.map((track, key) => ({
    key: `t-${key}`,
    label: <TrackItem id={`t-${key}`} track={track} />,
    children: <TrackControls id={key} />,
  }));

  return (
    <Collapse
      size="large"
      items={extendedTracks}
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 90 : 0} />}
      expandIconPosition="end"
      style={{ height: "100%", overflowY: "scroll", borderRadius: 0, marginBottom: "88px" }}
    />
  );
}
