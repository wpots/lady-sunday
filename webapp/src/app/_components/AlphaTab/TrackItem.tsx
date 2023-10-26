import { useContext, useState } from "react";
import Image from "next/image";
import { AlphaTabContext } from "@/app/_store/alphaTab-context";

interface TrackItemProps {
  id: string;
  track: Record<any, any>;
}
export default function TrackItem({ id, track }: TrackItemProps) {
  const [imgSrc, setImgSrc] = useState(`/icons/${track.shortName}.png`);
  const { activeTrack, setActiveTrack, apiInstance } = useContext(AlphaTabContext);
  const handleTrackClick = () => {
    setActiveTrack(id);
    if (apiInstance) apiInstance.renderTracks([track]);
  };
  return (
    <div className={`at-track ${activeTrack === id ? "active" : undefined}`} onClick={handleTrackClick}>
      <div className="at-track-icon">
        <Image src={imgSrc} width={48} height={48} alt={track.name} onError={e => setImgSrc("/icons/004-flute.png")} />
      </div>
      <div className="at-track-details">
        <div className="at-track-name">{track.name}</div>
      </div>
    </div>
  );
}
