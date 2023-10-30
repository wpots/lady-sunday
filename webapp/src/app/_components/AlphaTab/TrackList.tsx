"use client";
import { useContext, useEffect, useRef } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";
import TrackItem from "./TrackItem";
import { Collapse } from "antd";
import TrackControls from "./TrackControls";
import { DownOutlined } from "@ant-design/icons";

import "./TrackList.scss";

export default function TrackList() {
  const { tracks } = useContext(AlphaTabContext);

  const extendedTracks = tracks.map((track, key) => ({
    key: `t-${key}`,
    label: <TrackItem id={`t-${key}`} track={track} />,
    children: <TrackControls id={key} />,
  }));

  return (
    <Collapse
      size="small"
      items={extendedTracks}
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      expandIconPosition="end"
      style={{ width: "100%", height: "100%", overflowY: "scroll", borderRadius: 0, marginBottom: "88px" }}
    />
  );
}
