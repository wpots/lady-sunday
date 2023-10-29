"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AlphaTabContext } from "@/app/_store/alphaTab-context";

interface TrackItemProps {
  id: string;
  track: Record<any, any>;
}
export default function TrackItem({ id, track }: TrackItemProps) {
  // const [imgSrc, setImgSrc] = useState(`/icons/keyboard.svg`);
  const { activeTrack, setActiveTrack, apiInstance } = useContext(AlphaTabContext);

  useEffect(() => {
    if (apiInstance && activeTrack === id) apiInstance.renderTracks([track]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack, track]);

  const handleTrackClick = () => {
    setActiveTrack(id);
  };
  return (
    <div className={`at-track ${activeTrack === id ? "active" : undefined}`} onClick={handleTrackClick}>
      <div className="at-track-icon">
        <Image src="/icons/keyboard.svg" width={48} height={48} alt={track.name} />
      </div>
      <div className="at-track-details">
        <div className="at-track-name">{track.name}</div>
      </div>
    </div>
  );
}
