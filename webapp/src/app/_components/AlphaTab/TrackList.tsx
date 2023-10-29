"use client";
import { useContext, useEffect, useRef } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";
import TrackItem from "./TrackItem";

export default function TrackList() {
  const { tracks } = useContext(AlphaTabContext);
  return (
    <div className="at-track-list">
      {tracks.length > 0 && tracks.map((t, key) => <TrackItem id={`t-${key}`} track={t} key={key} />)}
    </div>
  );
}
