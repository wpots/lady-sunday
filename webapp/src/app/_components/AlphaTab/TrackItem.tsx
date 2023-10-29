"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import AppIcon from "../UI/AppIcon";

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

  const resolveIconByName = (name: string) => {
    const sanitizedName = name.toLowerCase();
    if (sanitizedName.includes("voice")) return "microphone";
    if (sanitizedName.includes("drums") || sanitizedName.includes("drum-set") || sanitizedName.includes("hi-hat"))
      return "drums";
    if (sanitizedName.includes("bells")) return "tambourine";
    if (sanitizedName.includes("flute")) return "flute";
    if (sanitizedName.includes("violin")) return "violin";
    if (sanitizedName.includes("piano")) return "keyboard";
    if (sanitizedName.includes("shaker")) return "maracas";
    if (sanitizedName.includes("electric") || sanitizedName.includes("bass")) return "electric-guitar";
    if (sanitizedName.includes("guitar")) return "guitar";
    return "keyboard";
  };

  const handleTrackClick = () => {
    setActiveTrack(id);
  };
  return (
    <div className={`at-track ${activeTrack === id ? "active" : ""}`} onClick={handleTrackClick}>
      <div className="at-track-icon">
        <AppIcon name={resolveIconByName(track.name)} />
      </div>
      <div className="at-track-details">
        <div className="at-track-name">{track.name}</div>
      </div>
    </div>
  );
}
